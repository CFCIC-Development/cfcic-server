import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { GoogleProfileDeconstructed } from './auth.strategy.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private prismaService: PrismaService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos }: GoogleProfileDeconstructed = profile;

    const userFields = {
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      display_picture: photos[0].value,
      provider: 'google',
    };

    let user = await this.prismaService.user.findUnique({
      where: { email: userFields.email },
    });
    if (!user) {
      user = await this.prismaService.user.create({
        data: userFields,
      });
    }
    return done(null, user);
  }
}
