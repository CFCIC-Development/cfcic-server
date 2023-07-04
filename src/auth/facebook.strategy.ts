import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { Strategy, Profile } from 'passport-facebook';
import { FacebookProfileDeconstructed } from './auth.strategy.types';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private prismaService: PrismaService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
      scope: ['email', 'public_profile'],
      profileFields: ['emails', 'name', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos, provider }: FacebookProfileDeconstructed =
      profile;

    const userFields = {
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      display_picture: photos[0].value,
      provider: provider,
    };

    let user = await this.prismaService.user.findUnique({
      where: { email: userFields.email },
    });
    if (!user) {
      user = await this.prismaService.user.create({ data: userFields });
    }

    done(null, user);
  }
}
