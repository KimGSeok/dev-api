import { Injectable } from "@nestjs/common";
import { ConnectionService } from "src/connection/connection.service";
import { getScriptExampleQuery, createAvatarQuery } from './avatar.query';

let url: string;

// Environment
if(process.env.NODE_ENV === 'development')
  url = 'http://localhost:30001/';
else
  url = 'https://api.cidev.kr/';

@Injectable()
export class AvatarService {

  constructor(private connection: ConnectionService){}

  async getVoiceScriptExampleList() {
    try{

      // Query
      const [response, field] = await this.connection.connectionPool.query(getScriptExampleQuery, []);
      return response;
    }catch(error){
      console.log('아바타 스크립트 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  async uploadFiles(data: object[], avatarId: string, avatarType:string, files: Array<Express.Multer.File>){
    try{

      
      // console.log(data);
      // console.log(avatarId);
      // console.log(avatarType);
      // console.log(files);

      // console.log(files[0].destination.split('/'));
      // console.log(files[0].destination.split('/')[1]);

      // TODO
      // data.forEach(async (item: any) => {

        // await this.connection.connectionPool.query(createAvatarQuery, []);
      // })

      console.log(avatarId);

      return avatarId;
    }catch(error){
      console.log('아바타 스크립트 생성 로직 에러발생');
      console.log(error);
      return error;
    }
  }
}