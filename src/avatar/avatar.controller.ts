import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {

  constructor(private service: AvatarService) {}

  @Get('/getScripts')
  async getVoiceScriptExample(){
    try{
      const result = await this.service.getVoiceScriptExampleList();
      return result;
      
    }catch(error){
      console.log('아바타 스크립트 조회중 에러발생');
      console.error(error);
    }
  }
}