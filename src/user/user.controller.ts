import { Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

  constructor(private service: UserService) { }

  /**
   * Description: 유저 목록 조회
   * Date: 2023.02.27
   * Author: Kim Gyeong Seok
   */
  @Get()
  async getUserLists() {
    try {

    } catch (error) {

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