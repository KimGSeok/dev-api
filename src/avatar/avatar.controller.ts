import { Body, Controller, Get, Post, UseInterceptors, Bind, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {

  constructor(private service: AvatarService) { }

  @Get('/getScripts')
  async getVoiceScriptExample() {
    try {

      const result = await this.service.getVoiceScriptExampleList();
      return result;
    } catch (error) {

      console.log('아바타 스크립트 조회중 에러발생');
      console.error(error);
      return error;
    }
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', null, multerOptions))
  async uploadAvatar(@Body() res: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    try {

      // Parameter
      const data = JSON.parse(res.data);
      const avatarId = res.avatarId;
      const avatarType = res.avatarType;

      const response = await this.service.uploadFiles(data, avatarId, avatarType, files);
      return response;
    } catch (error) {

      console.log('아바타 스크립트 생성중 에러발생');
      console.log(error);
      return error;
    }
  }
}