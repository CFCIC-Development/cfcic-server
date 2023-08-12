import * as nodemailer from 'nodemailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import {
  AttendanceCreationDto,
  AttendanceUpdateDto,
  AttendanceUpdateServicesRequired,
  AttendanceUpdatingDto,
} from './attendance.types';
import { DependentCreationFromParentObject } from 'src/dependent/dependent.types';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prismaService: PrismaService,
    private emailService: EmailService,
  ) {}

  async getAttendanceByEventId(eventId: string): Promise<any> {
    const attendance = await this.prismaService.attendance.findMany({
      where: {
        event_id: eventId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: {
              select: {
                phone_number: true,
                is_partner: true,
                is_church_member: true,
              },
            },
          },
        },
        services_required: {
          select: {
            event_service: {
              select: {
                name: true,
              },
            },
          },
        },
        children: {
          select: {
            dependent: true,
          },
        },
      },
    });
    return attendance;
  }

  async getAttendanceByUserId(userId: string): Promise<any> {
    const attendance = await this.prismaService.attendance.findMany({
      where: {
        user_id: userId,
      },
      include: {
        services_required: {
          select: {
            event_service: {
              select: {
                name: true,
              },
            },
          },
        },
        children: {
          select: {
            dependent: true,
          },
        },
      },
    });
    return attendance;
  }

  async getUserEventAttendance(eventId: string, userId: string): Promise<any> {
    const attendance = await this.prismaService.attendance.findFirst({
      where: {
        event_id: eventId,
        user_id: userId,
      },
      include: {
        services_required: {
          select: {
            event_service: {
              select: {
                name: true,
              },
            },
          },
        },
        children: {
          select: {
            dependent: true,
          },
        },
      },
    });
    return attendance;
  }

  private async createDependents(
    data: DependentCreationFromParentObject[],
  ): Promise<any> {
    const newDependents = [];
    if (!data) return newDependents;
    for (const dep of data) {
      const newDependent = await this.prismaService.dependent.create({
        data: dep,
        select: {
          id: true,
        },
      });
      newDependents.push({ dependent_id: newDependent.id });
    }
    return newDependents;
  }

  async createAttendance(data: AttendanceCreationDto): Promise<any> {
    // Return early if attendance already exists
    const existingAttendance = await this.prismaService.attendance.findFirst({
      where: {
        event_id: data.event_id,
        user_id: data.user_id,
      },
    });
    if (existingAttendance) {
      throw new HttpException('Attendance exists', HttpStatus.BAD_REQUEST);
    }
    // Create online attendance
    if (!data.in_person) {
      const onlineAttendance = await this.prismaService.attendance.create({
        data: {
          event_id: data.event_id,
          user_id: data.user_id,
          in_person: data.in_person,
        },
      });

      // Send congratulatory email to the user
      await this.emailService.sendEventCongratulatoryEmail(
        data,
        onlineAttendance,
      );
      return onlineAttendance;
    }
    // Create any unsaved dependents
    const newDependents = await this.createDependents(data.new_dependents);

    const services = data.services_required.map((service) => {
      return {
        event_service_id: service,
      };
    });

    // Convert existing dependents to the correct format to allow destructuring later
    const oldDependents =
      data.existing_dependents && data.existing_dependents.length > 0
        ? data.existing_dependents
        : [];

    const attendance = await this.prismaService.attendance.create({
      data: {
        event_id: data.event_id,
        user_id: data.user_id,
        in_person: data.in_person,
        requires_feeding: data.requires_feeding,
        requires_accomodation: data.requires_accomodation,
        requires_transport: data.requires_transport,
        dates_attending: data.dates_attending,
        services_required: {
          createMany: {
            data: services,
          },
        },
        children: {
          createMany: {
            data: [...oldDependents, ...newDependents],
          },
        },
      },
      include: {
        services_required: {
          select: {
            event_service: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        children: {
          select: {
            dependent: true,
          },
        },
      },
    });
    await this.emailService.sendEventCongratulatoryEmail(data, attendance);
    return attendance;
  }

  async sendCongratulatoryEmail(data: AttendanceCreationDto): Promise<void> {
    const transporter = nodemailer.createTransport({
      // Configure your email transporter (SMTP, Gmail, etc.)
      // Example for using Gmail:
      host: 'mail.christfamilyministries.org', // Your SMTP server hostname
      port: 465, // Port for secure SMTP (587 is a common port for TLS)
      secure: true, // Use TLS (true for 465 port, false for other ports)
      auth: {
        user: 'events@christfamilyministries.org', // Your email address
        pass: 'Colo_3166', // Your email password
      },
    });

    const emailHtml = `
      <html>
        <head>
          <style>
            /* Your CSS styles for the email */
          </style>
        </head>
        <body>
          <h1>Congratulations on your Successful Registration!</h1>
          <p>Dear ${data?.user?.name}, we are excited to inform you that your registration for the event was successful.</p>
          <!-- Add more styled content here as needed -->
        </body>
      </html>
    `;

    const mailOptions = {
      from: 'events@christfamilyministries.org', // Sender address
      to: data?.user?.email, // Receiver address
      subject: 'Congratulations on Successful Registration',
      html: emailHtml,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Congratulatory email sent successfully');
    } catch (error) {
      console.error('Error sending congratulatory email:', error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAttendance(id: number, data: AttendanceUpdateDto): Promise<any> {
    const updateData = data;
    const existingAttendance = await this.prismaService.attendance.findUnique({
      where: { id },
      include: {
        services_required: {
          select: {
            event_service_id: true,
          },
        },
      },
    });

    // Add services that aren't on the saved model
    const services: AttendanceUpdateServicesRequired[] =
      data.services_required.map((service) => {
        const serviceExists = existingAttendance.services_required.find(
          (existingService) => {
            return existingService.event_service_id === service;
          },
        );
        if (serviceExists) {
          return;
        } else {
          return {
            event_service_id: service,
          };
        }
      });

    // Delete services that are on the saved model but not in the update
    const removeServices: AttendanceUpdateServicesRequired[] =
      existingAttendance.services_required.map((service) => {
        const serviceExists = data.services_required.find((newService) => {
          return newService === service.event_service_id;
        });
        if (!serviceExists) {
          return {
            event_service_id: service.event_service_id,
          };
        }
      });
    if (
      services.filter(Boolean).length > 0 ||
      removeServices.filter(Boolean).length > 0
    ) {
      (updateData as AttendanceUpdatingDto)['services_required'] = {};
    }
    if (services.filter(Boolean).length > 0) {
      updateData['services_required']['create'] = services.filter(Boolean);
    }

    if (removeServices.filter(Boolean).length > 0) {
      updateData['services_required']['deleteMany'] =
        removeServices.filter(Boolean);
    }

    /* The unmodified array of integer id's reaching here means that there are no values
     to add or delete, so ignore it in update*/
    if (Array.isArray(updateData['services_required'])) {
      delete updateData['services_required'];
    }

    const newDependents = await this.createDependents(data.new_dependents);

    const copiedUpdateData = Object.assign({}, updateData);
    delete copiedUpdateData['new_dependents'];
    delete copiedUpdateData['add_existing_dependents'];
    delete copiedUpdateData['remove_existing_dependents'];

    const depToAdd = data.add_existing_dependents
      ? data.add_existing_dependents
      : [];

    const attendance = await this.prismaService.attendance.update({
      where: {
        id,
      },
      data: {
        ...(copiedUpdateData as any),
        children: {
          createMany: {
            data: [...newDependents, ...depToAdd],
          },
          deleteMany: data.remove_existing_dependents,
        },
      },
      include: {
        services_required: {
          select: {
            event_service: {
              select: {
                name: true,
              },
            },
          },
        },
        children: {
          select: {
            dependent: true,
          },
        },
      },
    });
    return attendance;
  }
}
