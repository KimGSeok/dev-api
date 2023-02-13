import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from "src/connection/connection.service";
import { createProjectQuery } from './project.query';

@Injectable()
export class ProjectService{

  constructor(private connection: ConnectionService, private readonly httpService: HttpService){}

  async createProject(name: string){
    try{

      // Query
      const [response, field] = await this.connection.connectionPool.query(createProjectQuery, [name]);
      return response;
    }catch(error){
      console.log(error);
      console.log('프로젝트 생성중 로직 에러발생');
      return error;
    }
  }

  async createAvatar(avatarInfo: any){
    try{

      // TODO TTS, Lipsync 구분
      const { avatar, voice, scriptList } = avatarInfo[0];
      const mlAvatarArray = [];

      // Machine Learing Data Argument Object
      scriptList.forEach((el: any) => {
        mlAvatarArray.push({
          'script': el.text,
          'speed': el.speed,
          'pause_second': el.pauseSecond,
          'audio_twin_version': voice.voiceModel ? voice.voiceModel : '01831c53-3a8b-7a50-bd97-v16ch5f8d45s'
        })
      });

      // Fast API 요청
      const FAST_API_URL = 'http://fury.aitricsdev.com:40068/inference';
      const options = {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      // TODO Response오면 DB Insert
      const response: any = await this.httpService.post(FAST_API_URL, mlAvatarArray, options).toPromise();

      const rawData = await fetch(`http://fury.aitricsdev.com:40068${response.data.audio_path}`);
      const blob = await rawData.blob();
      let result = response.data;

      result.type = blob.type;
      result.arrayBuffer = Object.values(new Uint8Array(await blob.arrayBuffer()));

      return JSON.stringify(result);

    }catch(error){
      console.log(error);
      console.log('프로젝트 아바타 모델 생성중 로직 에러발생');
      return error;
    }
  }
}