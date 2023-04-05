import { Body, Controller, Get, Request, Post, Response, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {

  constructor(private service: ProjectService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProjectLists(@Request() req: any, @Response() res: any) {
    try {

      const userInfo = req.user;
      const response = await this.service.getProjectList(userInfo);

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      console.error('프로젝트 조회중 에러발생');
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getProjectDetailInfo(@Request() req: any, @Response() res: any, @Param('id') id: string) {
    try {

      const projectId = id;
      const response = await this.service.getProjectDetailInfo(projectId);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      console.error('프로젝트 조회중 에러발생');
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(@Request() req: any, @Body() body: any) {
    try {

      // Parameter
      const name: string = body.projectName;
      const userInfo = req.user;
      const accessToken = req.headers.authorization;
      const response = await this.service.createProject(name, userInfo, accessToken);
      return response;
    } catch (error) {

      console.log(error);
      console.log('프로젝트 생성중 에러발생');
      return error;
    }
  }

  @Post('/avatar')
  async createAvatarModel(@Body() res: any) {
    try {

      // Parameter
      const avatar: object = res;
      const response = await this.service.createAvatar(avatar);
      return response;

    } catch (error) {

      console.log(error);
      console.log('프로젝트 아바타 모델 생성중 에러발생');
      return error;
    }
  }
}