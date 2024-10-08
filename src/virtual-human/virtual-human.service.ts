import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from "src/connection/connection.service";
import {
  getVirtualHumanListQuery,
  getVirtualHumanDetailInfoQuery,
  getRecordScriptQuery,
  createVirtualHumanQuery,
  createVirtualHumanRecordResourceQuery,
  getVirtualHumanResourceListQuery,
  deleteVirtualHumanQuery
} from './virtual-human.query';

// Environment
let url: string = process.env.NODE_ENV === 'development' ? 'http://localhost:30001/' : 'https://api.cidev.kr/';
interface KeyValueProps {
  [key: string]: string
}

@Injectable()
export class VirtualHumanService {

  constructor(
    private connection: ConnectionService,
    private readonly httpService: HttpService
  ) { }

  async getVirtualHumanList(userInfo: KeyValueProps) {
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

  async getVirtualHumanDetailInfo(id: string) {
    try {

      // TODO 조건주고 위에 목록 불러오기랑 합치기

      // Query
      const [response, field] = await this.connection.connectionPool.query(getVirtualHumanDetailInfoQuery, [id]);
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

  async getVirtualHumanResourceList(id: string, uuid: string) {
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
      const FAST_API_URL = avatarType === 'voice' ? process.env.FAST_API_FINETUNE_AUDIO_URL : process.env.FAST_API_FINETUNE_VIDEO_URL;
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
            "url": urlArr[0]
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
          virtualHumanResponse.insertId, // virtual_human_id
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

  async deleteVirtualHuman(id: string) {
    try {

      (await this.connection.connectionPool.getConnection()).beginTransaction();

      // Query
      const [response, field] = await this.connection.connectionPool.query(deleteVirtualHumanQuery, [id]);

      (await this.connection.connectionPool.getConnection()).commit();

      (await this.connection.connectionPool.getConnection()).destroy();

      return response;
    } catch (error) {
      (await this.connection.connectionPool.getConnection()).rollback();
      console.log('가상인간 삭제 로직 에러발생');
      console.error(error);
      return error;
    }
  }
}
