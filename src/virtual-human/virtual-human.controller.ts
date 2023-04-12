import { Body, Controller, Get, Param, Post, Request, UseInterceptors, UseGuards, UploadedFiles, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer';
import { VirtualHumanService } from './virtual-human.service';

@Controller('virtual-human')
export class VirtualHumanController {

  constructor(private service: VirtualHumanService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getVirtualHumanList(@Request() req: any) {
    try {

      const userInfo = req.user;
      const result = await this.service.getVirtualHumanList(userInfo);
      return result;
    } catch (error) {
      console.log('가상인간 목록 조회중 에러발생');
      console.error(error);
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getScripts')
  async getVoiceRecordScript() {
    try {

      const result = await this.service.getVoiceScriptExampleList();
      return result;
    } catch (error) {
      console.log('가상인간 스크립트 조회중 에러발생');
      console.error(error);
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getVirtualHumanDetailInfo(@Param('id') id: string) {
    try {

      const result = await this.service.getVirtualHumanDetailInfo(id);
      return result;
    } catch (error) {
      console.log('가상인간 상세정보 조회중 에러발생');
      console.error(error);
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/resource/:params')
  async getVirtualHumanRecordResource(@Param('params') params: string) {
    try {

      // TODO

      const id = params.split('&')[0];
      const uuid = params.split('&')[1].replace('uuid=', '');
      const result = await this.service.getVirtualHumanResourceList(id, uuid);
      return result;
    } catch (error) {
      console.log('가상인간 녹음 리소스 조회중 에러발생');
      console.error(error);
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', null, multerOptions))
  async uploadVirtualHuman(@Request() req: any, @Body() res: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    try {

      // Parameter
      const userInfo = req.user;
      const data = res.data ? JSON.parse(res.data) : '';
      const virtualHumanName = res.virtualHumanName;
      const virtualHumanId = res.virtualHumanId;
      const virtualHumanType = res.virtualHumanType;

      const response = await this.service.uploadFiles(userInfo, data, virtualHumanName, virtualHumanId, virtualHumanType, files);
      return response;
    } catch (error) {

      console.log('가상인간 스크립트 생성중 에러발생');
      console.log(error);
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteVirtualHuman(@Request() req: any) {
    try {
      const { id } = req.body;
      const response = await this.service.deleteVirtualHuman(id);
      return response;
    } catch (error) {
      console.log(error);
      console.log('가상인간 삭제중 에러발생');
      return error;
    }
  }
}