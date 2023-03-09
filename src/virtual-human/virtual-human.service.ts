import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from "src/connection/connection.service";
import { getRecordScriptQuery, createAvatarQuery } from './virtual-human.query';

let url: string;

// Environment
if (process.env.NODE_ENV === 'development')
  url = 'http://localhost:30001/';
else
  url = 'https://api.cidev.kr/';

@Injectable()
export class VirtualHumanService {

  constructor(
    private connection: ConnectionService,
    private readonly httpService: HttpService
  ) { }

  async getVoiceScriptExampleList() {
    try {

      // Query
      const [response, field] = await this.connection.connectionPool.query(getRecordScriptQuery, []);
      return response;
    } catch (error) {
      console.log('아바타 스크립트 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  async uploadFiles(data: object[], avatarId: string, avatarType: string, files: Array<Express.Multer.File>) {
    try {

      console.log(data);
      console.log(avatarId);
      console.log(avatarType);
      console.log(files);

      console.log(files[0].destination.split('/'));
      console.log(files[0].destination.split('/')[1]);

      (await this.connection.connectionPool.getConnection()).beginTransaction();

      // For Finetuning ResourceList
      let urlArr = []; // Files
      let scriptArr = []; // data

      files.forEach(async (item: any) => {
        urlArr.push(url + `file/download?date=${item.destination.split[2]}$avatar=${avatarId}$file=${item.filename}`);
      })

      data.forEach(async (item: any) => {
        scriptArr.push(item.script);
      })

      // Fast API 요청
      const FAST_API_URL = 'http://fury.aitricsdev.com:40068/finetune';
      const options = {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      // TODO Voice 일때
      const body = {
        urls: urlArr,
        scripts: scriptArr,
        audio_twin_version: avatarId
      }

      console.log(body);

      const response: any = await this.httpService.post(FAST_API_URL, body, options).toPromise();

      console.log(response);


      // TODO
      // data.forEach(async (item: any) => {

      // await this.connection.connectionPool.query(createAvatarQuery, []);
      // })

      console.log(avatarId);

      (await this.connection.connectionPool.getConnection()).commit();

      return avatarId;
    } catch (error) {

      (await this.connection.connectionPool.getConnection()).rollback();
      console.log('아바타 스크립트 생성 로직 에러발생');
      console.error(error);
      return error;
    }
  }
}