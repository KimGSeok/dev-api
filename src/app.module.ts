import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarController } from './avatar/avatar.controller';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    AvatarController,
    ProjectController
  ],
  providers: [AppService],
})
export class AppModule { }
