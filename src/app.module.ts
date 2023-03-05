import { Injectable, Logger, MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './connection/connection.service';
import { AvatarController } from './avatar/avatar.controller';
import { AvatarService } from './avatar/avatar.service';
import { ProjectController } from './project/project.controller';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { ProjectService } from './project/project.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
      );
    });
    next();
  }
}

@Module({
  imports: [
    HttpModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    WinstonModule.forRoot({
      transports: []
    })
  ],
  controllers: [
    AppController,
    AvatarController,
    ProjectController,
    FileController,
    UserController,
    AuthController,
    UserController
  ],
  providers: [
    AppService,
    ConnectionService,
    AvatarService,
    ProjectService,
    FileService,
    UserService,
    AuthService,
  ], // Model
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('*');
  }
}
