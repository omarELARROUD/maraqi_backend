import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  // app.enableCors({origin: true, credentials: true});

  app.useGlobalPipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted:true})
  )
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      }
    }),
  );
  // Initialize Passport
  app.use(passport.initialize());


  await app.listen(3002);
}
bootstrap();
