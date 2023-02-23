import { Controller, Get, Response, Query } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('download')
  downloadFile(@Response() res: any, @Query() url) {
    return this.fileService.downloadFile(res, url);
  }
}