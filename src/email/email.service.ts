import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AuthDto } from '../auth/dto';
import { AttendanceCreationDto } from 'src/attendance/attendance.types';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async sendSignUpCongratulatoryEmail(data: AuthDto): Promise<void> {
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
          <h1>Congratulations on your Successful Sign Up!</h1>
          <p>Dear ${data?.name}, we are excited to inform you that your sign up for the cfc app was successful.</p>
          <!-- Add more styled content here as needed -->
        </body>
      </html>
    `;

    const mailOptions = {
      from: 'events@christfamilyministries.org', // Sender address
      to: data?.email, // Receiver address
      subject: 'Congratulations on Successful Sign Up',
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

  async sendEventCongratulatoryEmail(
    data: AttendanceCreationDto,
  ): Promise<void> {
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
          <h1>Congratulations on your Successful Sign Up!</h1>
          <p>Dear ${data?.user?.name}, we are excited to inform you that your sign up for the cfc app was successful.</p>
          <!-- Add more styled content here as needed -->
        </body>
      </html>
    `;

    const mailOptions = {
      from: 'events@christfamilyministries.org', // Sender address
      to: data?.user?.email, // Receiver address
      subject: 'Congratulations on Successful Sign Up',
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
}
