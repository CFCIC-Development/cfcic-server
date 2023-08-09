import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as sessionStore from 'connect-pg-simple';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from './prisma-module/prisma.service';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const store = new (sessionStore(session))({
    conString: configService.get<string>('DATABASE_URL'),
    createTableIfMissing: true,
  });
  app.use(
    session({
      store: store,
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        domain: configService.get<string>('APP_FRONTEND_DOMAIN'),
        secure: true,
      },
    }),
  );
  app.set('trust proxy', 1);
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CFCIC API')
    .setDescription('The CFCIC API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('docs', app, document);

  await app.listen(port || 80);
}
bootstrap();
