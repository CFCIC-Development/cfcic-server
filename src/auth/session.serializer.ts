import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    const { id, email, name } = user;
    done(null, { id, email, name });
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): Promise<any> {
    return done(null, payload);
  }
}
