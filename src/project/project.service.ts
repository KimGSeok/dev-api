import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from "src/connection/connection.service";
import { getProjectListQuery, createProjectQuery } from './project.query';

interface KeyValueProps {
  [key: string]: string
}

@Injectable()
export class ProjectService {

  constructor(
    private connection: ConnectionService,
    private readonly httpService: HttpService
  ) { }

  /**
   * Description: 프로젝트 생성
   * Date: 2023.03.11
   * Author: Kim Gyeong Seok
   */
  async getProjectList(userInfo: KeyValueProps) {
    try {

      // Query
      const [response, field] = await this.connection.connectionPool.query(getProjectListQuery, [userInfo.id]);
      return response;
    } catch (error) {
      console.error(error);
      console.log('프로젝트 목록 조회중 로직 에러발생');
      return error;
    }
  }

  /**
   * Description: 프로젝트 생성
   * Date: 2023.03.11
   * Author: Kim Gyeong Seok
   */
  async createProject(name: string, userInfo: KeyValueProps, accessToken: string) {
    try {

      // Query
      const [response, field] = await this.connection.connectionPool.query(createProjectQuery, [userInfo.id, name]);
      return response;
    } catch (error) {
      console.error(error);
      console.log('프로젝트 생성중 로직 에러발생');
      return error;
    }
  }

  /**
   * Description: 프로젝트 내 컨텐츠 생성(아바타, 목소리)
   * Date: 2023.03.11
   * Author: Kim Gyeong Seok
   */
  async createAvatar(avatarInfo: any) {
    try {

      // TTS, Lipsync 구분
      const { avatar, voice, scriptList } = avatarInfo;
      const contentType = avatar.name === '' ? 'audio' : 'video';
      let mlObject: any = {};
      const mlVoiceArray = [];

      // Machine Learing Data Argument Object
      scriptList.forEach((el: any) => {
        mlVoiceArray.push({
          'script': el.text,
          'speed': el.speed,
          'pause_second': el.pauseSecond,
          'audio_twin_version': voice.model ? voice.model : '01831c53-3a8b-7a50-bd97-v16ch5f8d45s'
        })
      });

      if (contentType === 'video'){
        mlObject.TTSItems = mlVoiceArray;
        mlObject.LipsyncItems = {
          'cut_start_time': 0,
          'cut_end_time': -1,
          'video_twin_version': avatar.model
        }
      }
      else{
        mlObject = mlVoiceArray;
      }

      const FAST_API_URL = contentType === 'audio' ? process.env.FAST_API_INFERENCE_AUDIO_URL : process.env.FAST_API_INFERENCE_VIDEO_URL;
      const options = {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      // TODO Response오면 DB Insert
      const response: any = await this.httpService.post(FAST_API_URL, mlObject, options).toPromise();

      console.log(response);

      if (response.data.result === 'failed') {
        return new ServiceUnavailableException();
      }

      let rawData;
      if(contentType === 'audio')
        rawData = await fetch(`http://fury.aitricsdev.com:40068${response.data.audio_path}`);
      else
        rawData = await fetch(`http://fury.aitricsdev.com:40065${response.data.video_path}`);

      const blob = await rawData.blob();
      let result = response.data;

      result.type = blob.type;
      result.arrayBuffer = Object.values(new Uint8Array(await blob.arrayBuffer()));

      return JSON.stringify(result);
    } catch (error) {
      console.error(error);
      console.log('프로젝트 아바타 모델 생성중 로직 에러발생');
      return error;
    }
  }
}