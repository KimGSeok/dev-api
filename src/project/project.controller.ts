import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {

  constructor(private service: ProjectService){}

  @Get()
  getProjectLists(){
    try{

    }catch(error){
      console.log(error);
      console.log('프로젝트 조회중 에러발생');
      return error;
    }
  }

  @Post()
  async createProject(@Body() res: any){

    try{

      // Parameter
      const name: string = res.projectName;
      const response = await this.service.createProject(name);
      return response;
    }catch(error){

      console.log(error);
      console.log('프로젝트 생성중 에러발생');
      return error;
    }
  }

  @Post('/avatar')
  async createAvatarModel(@Body() res: any){
    try{

      console.log("---------컨트롤러-----------");

      // Parameter
      const avatar: object = res;
      const response = await this.service.createAvatar(avatar);
      console.log(response);

      return response;
      
    }catch(error){

      console.log(error);
      console.log('프로젝트 아바타 모델 생성중 에러발생');
      return error;
    }
  }
}