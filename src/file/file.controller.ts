import { Controller, Get, Res, Response, Query, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('file')
export class FileController {

  constructor(private fileService: FileService) { }

  @Get('download')
  downloadFile(@Response() res: any, @Query() url) {
    return this.fileService.downloadFile(res, url);
  }

  @UseGuards(JwtAuthGuard)
  @Get('buffer')
  async fileToBuffer(@Response() res: any, @Query() query: any) {
    try {
      const { url } = query;
      const response = await this.fileService.getFileBuffer(url);
      return res.status(200).send(response);
    } catch (error) {
      console.log('파일 버퍼 변환중 에러발생');
      console.error(error);
      return error;
    }
  }
}