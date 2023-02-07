import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService  } from './connection/connection.service';
import { AvatarController } from './avatar/avatar.controller';
import { AvatarService } from './avatar/avatar.service';
import { ProjectController } from './project/project.controller';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
  ],
  providers: [
    AppService,
    ConnectionService,
    AvatarService,
    FileService
  ], // Model
})
export class AppModule { }
