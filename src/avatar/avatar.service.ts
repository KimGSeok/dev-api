import { Injectable } from "@nestjs/common";
import { ConnectionService } from "src/connection/connection.service";
import { getScriptExampleQuery } from './avatar.query';

@Injectable()
export class AvatarService {
  constructor(private connection: ConnectionService){}

  async getVoiceScriptExampleList() {
    try{

      const [response, field] = await this.connection.connectionPool.query(getScriptExampleQuery, []);
      return response;
    }catch(error){
      return error;
    }
  }
}