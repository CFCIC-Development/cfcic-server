import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Redirect,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookAuthGuard } from './facebook.auth.guard';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthGuard } from './google.auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/callback')
  @UseGuards(FacebookAuthGuard)
  @Redirect()
  async facebookLoginCallback(): Promise<any> {
    return {
      url: this.configService.get<string>('APP_FRONTEND_URL'),
      statusCode: HttpStatus.MOVED_PERMANENTLY,
    };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  async googleLoginCallback(): Promise<any> {
    return {
      url: this.configService.get<string>('APP_FRONTEND_URL'),
      statusCode: HttpStatus.MOVED_PERMANENTLY,
    };
  }

  @Get('/user')
  @UseGuards(AuthenticatedGuard)
  async guetUser(@Req() req: any): Promise<any> {
    const { name, id, email, display_picture } =
      await this.authService.getLoggedInUser(req.user.id);

    return {
      user: { name, id, email, display_picture },
    };
  }

  @Get('/logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: any): Promise<any> {
    await req.session.destroy();
    return {
      statusCode: HttpStatus.OK,
      message: 'Logged out successfully',
    };
  }
}
