import { Controller, Get, Res, Response, Query, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import express from 'express';
import * as fs from 'fs';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Get('download')
  downloadFile(@Response() res: any, @Query() url) {
    return this.fileService.downloadFile(res, url);
  }

  @Get('buffer')
  async fileToBuffer(@Res() res: express.Response, @Query() query) {
    try {
      const { url } = query;

      const rawData = await fetch(url);

      console.log(rawData);

      const blob = await rawData.blob();

      console.log(blob);



      res.set({
        'Content-Type': 'audio/wav',
        'Content-Length': blob.size,
      });

      res.send(blob);
    } catch (error) {
      console.log('파일 버퍼 변환중 에러발생');
      console.error(error);
      return error;
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('buffer')
  // fileToBuffer(@Query() query) {
  //   try {
  //     const { url } = query;
  //     return this.fileService.getFileBuffer(url);
  //   } catch (error) {
  //     console.log('파일 버퍼 변환중 에러발생');
  //     console.error(error);
  //     return error;
  //   }
  // }
}