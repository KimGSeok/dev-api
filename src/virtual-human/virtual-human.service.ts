import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from "src/connection/connection.service";
import {
  getVirtualHumanListQuery,
  getRecordScriptQuery,
  createVirtualHumanQuery,
  createVirtualHumanRecordResourceQuery,
  getVirtualHumanResourceListQuery
} from './virtual-human.query';

// Environment
let url: string = process.env.NODE_ENV === 'development' ? 'http://localhost:30001/' : 'https://api.cidev.kr/';
interface KeyValueProps{
  [key:string]: string
}

@Injectable()
export class VirtualHumanService {

  constructor(
    private connection: ConnectionService,
    private readonly httpService: HttpService
  ) { }

  async getVirtualHumanList(userInfo: KeyValueProps){
    try {

      // Query
      const [response, field] = await this.connection.connectionPool.query(getVirtualHumanListQuery, [userInfo.id]);
      return response;
    } catch (error) {
      console.log('가상인간 목록 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  async getVoiceScriptExampleList() {
    try {

      // Query
      const [response, field] = await this.connection.connectionPool.query(getRecordScriptQuery, []);
      return response;
    } catch (error) {
      console.log('가상인간 스크립트 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  async getVirtualHumanResourceList(id: string, uuid: string){
    try {

      // TODO uuid remove

      // Query
      const [response, field] = await this.connection.connectionPool.query(getVirtualHumanResourceListQuery, [id, uuid]);
      return response;
    } catch (error) {
      console.log('가상인간 상세정보 조회 로직 에러발생');
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
          "video_twin_version": virtualHumanId,
          "video_url": urlArr[0]
        };
      
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

      (await this.connection.connectionPool.getConnection()).destroy();
      
      console.log('----------------------- 가상인간 생성 결과 ---------------------------');

      this.httpService.post(FAST_API_URL, body, options).toPromise();

      return;
    } catch (error) {

      (await this.connection.connectionPool.getConnection()).rollback();
      console.log('가상인간 스크립트 생성 로직 에러발생');
      console.error(error);
      return error;
    }
  }
}
