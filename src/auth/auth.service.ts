import { PrismaService } from '../prisma-module/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import {
  GetResult,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

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
          email: dto.email,
          password: hash,
        },
      });

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
}
