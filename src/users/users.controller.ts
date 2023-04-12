import { Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

  constructor(private service: UsersService) { }

  /**
   * Description: 유저 목록 조회
   * Date: 2023.04.12
   * Author: Kim Gyeong Seok
   */
  @UseGuards(JwtAuthGuard)
  @Get('/:organization')
  async getUserLists(@Request() req: any, @Param('organization') organization: string) {
    try {

      const userInfo = req.user;
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
   * Date: 2023.02.27
   * Author: Kim Gyeong Seok
   */
  @Post()
  async createUser() {
    try {

    } catch (error) {

    }
  }
}