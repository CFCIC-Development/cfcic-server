import { PrismaService } from '../prisma-module/prisma.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import {
  GetResult,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}

  async getLoggedInUser(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name || null,
          email: dto.email,
          password: hash,
        },
      });
      await this.emailService.sendSignUpCongratulatoryEmail(dto);
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    await this.emailService.sendSignUpCongratulatoryEmail(dto);
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{
    access_token: string;
    user: GetResult<
      {
        id: string;
        email: string;
        password: string;
        name: string;
        display_picture: string;
        provider: string;
        createdAt: Date;
        updatedAt: Date;
      },
      { [x: string]: () => unknown }
    >;
  }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '90m',
      secret: secret,
    });

    const userData = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    // Delete the 'password' key from the 'userData' object
    delete userData.password;

    return {
      access_token: token,
      user: userData,
    };
  }

  async sendCongratulatoryEmail(data: AuthDto): Promise<void> {
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
}
