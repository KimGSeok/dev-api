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
      path.join(process.cwd(), `public/${date}/${avatar}/${file}`),
    );
    stream.pipe(res);
    return;
  }
}