import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import path from 'path';

interface UrlProps {
  date: string;
  avatar: string;
  file: string;
}

@Injectable()
export class FileService {

  downloadFile(res: Response, url: UrlProps) {

    // Parameter
    const { date, avatar, file } = url;
    // const fileName = encodeURIComponent('한글파일.txt');
    res.set({ 'Content-Disposition': `attachment; filename=${file}` });

    const stream = createReadStream(
      path.join(process.cwd(), `src/public/${date}/${avatar}/${file}`),
    );
    stream.pipe(res);
    return;
  }

  async getFileBuffer(url: string) {
    try {

      const rawData = await fetch(url);
      const blob = await rawData.blob();

      const type = blob.type;
      const arrayBuffer = Object.values(new Uint8Array(await blob.arrayBuffer()));

      return { type, arrayBuffer };
    } catch (error) {
      console.log('파일 버퍼 변환중 로직 에러발생');
      console.error(error);
      return error;
    }
  }
}