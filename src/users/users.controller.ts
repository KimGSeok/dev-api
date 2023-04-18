import { Controller, Get, Param, Post, Put, Delete, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

  constructor(private service: UsersService) { }

  /**
   * Description: 유저 상세정보 조회
   * Date: 2023.04.17
   * Author: Kim Gyeong Seok
   */
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserDetailInfo(@Request() req: any, @Param('id') id: string) {
    try {

      const userInfo = req.user;
      const response = await this.service.getUserDetailInfo(userInfo, id);
      return response;
    } catch (error) {
      console.log('유저 상세정보 조회중 에러발생');
      console.error(error);
      return error;
    }
  }

  /**
   * Description: 유저 목록 조회
   * Date: 2023.04.12
   * Author: Kim Gyeong Seok
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserLists(@Request() req: any, ) {
    try {

      const userInfo = req.user;
      const organization = req.query.organization
      const response = await this.service.getUsersList(userInfo, organization);
      return response;
    } catch (error) {
      console.log('유저 목록 조회중 에러발생');
      console.error(error);
      return error;
    }
  }

  /**
   * Description: 유저 생성
   * Date: 2023.04.16
   * Author: Kim Gyeong Seok
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Request() req: any) {
    try {

      const { user, body } = req;
      const response = await this.service.createUser(user, body);
      return response;
    } catch (error) {
      console.log('유저 생성중 에러발생');
      console.error(error);
      return error;
    }
  }

  /**
   * Description: 유저 정보 수정
   * Date: 2023.04.17
   * Author: Kim Gyeong Seok
   */
  @UseGuards(JwtAuthGuard)
  @Put()
  async modifyUserInfo(@Request() req: any) {
    try {

      const { user, body } = req;
      const response = await this.service.modifyUserInfo(user, body);
      return response;
    } catch (error) {
      console.log('유저 정보 수정중 에러발생');
      console.error(error);
      return error;
    }
  }

  /**
   * Description: 유저 정보 삭제
   * Date: 2023.04.17
   * Author: Kim Gyeong Seok
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUserInfo(@Request() req: any) {
    try {

      const { user, body } = req;
      const response = await this.service.deleteUserInfo(body);
      return response;
    } catch (error) {
      console.log('유저 정보 수정중 에러발생');
      console.error(error);
      return error;
    }
  }
}