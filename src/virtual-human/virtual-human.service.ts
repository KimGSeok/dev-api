import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from "src/connection/connection.service";
import { getRecordScriptQuery, createVirtualHumanQuery, createVirtualHumanRecordResourceQuery } from './virtual-human.query';

let url: string;
interface KeyValueProps{
  [key:string]: string
}


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

  async uploadFiles(userInfo: KeyValueProps, data: object[], virtualHumanName: string, virtualHumanId: string, avatarType: string, files: Array<Express.Multer.File>) {
    try {

      (await this.connection.connectionPool.getConnection()).beginTransaction();

      // For Finetuning ResourceList
      let urlArr = []; // Files
      let scriptArr = []; // data

      // For Finetuning
      files.forEach(async (item: any) => {
        urlArr.push(url + `file/download?date=${item.destination.split('/')[2]}&avatar=${virtualHumanId}&file=${item.filename}`);
      })

      // Only Voice
      avatarType === 'voice' && data.forEach(async (item: any) => {
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

      const body =
        avatarType === 'voice' ?
        {
          "urls": urlArr,
          "scripts": scriptArr,
          "audio_twin_version": virtualHumanId
        } : 
        {
          "video_twin_version": "string",
          "video_url": "string"
        };
      

      const response: any = await this.httpService.post(FAST_API_URL, body, options).toPromise();

      console.log('----------------------- 가상인간 생성 결과 ---------------------------');
      console.log(response.data);

      // Virtual_human Table Create Query
      const [virtualHumanResponse]: any = await this.connection.connectionPool.query(createVirtualHumanQuery, [
        virtualHumanId,
        userInfo.organization_id,
        userInfo.id,
        virtualHumanName,
        avatarType,
        scriptArr.length
      ]);

      files.forEach(async (item, index) => {
        const script: any = data[index];

        // Virtual_human Record Resource Query
        await this.connection.connectionPool.query(createVirtualHumanRecordResourceQuery, [
          virtualHumanResponse.affectedRows, // virtual_human_id
          avatarType === 'voice' ? script.id : '', // record_script_id
          avatarType, // record_type
          item.filename, // file_name
          item.path, // storage_path
          url + `file/download?date=${item.destination.split('/')[2]}&avatar=${virtualHumanId}&file=${item.filename}`, // download_url
        ]);
      });

      (await this.connection.connectionPool.getConnection()).commit();

      return ;
    } catch (error) {

      (await this.connection.connectionPool.getConnection()).rollback();
      console.log('아바타 스크립트 생성 로직 에러발생');
      console.error(error);
      return error;
    }
  }
}
