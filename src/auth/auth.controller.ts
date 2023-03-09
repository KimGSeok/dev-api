import { Controller, Post, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) { }

  /**
   * Description: 로그인
   * Date: 2023.02.27
   * Author: Kim Gyeong Seok
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {

    // Login Auth를 통과 했을 때,
    return this.service.login(req.user);
  }

  /**
   * Description: 로그인 확인
   * Date: 2023.03.04
   * Author: Kim Gyeong Seok
   */
  @UseGuards(JwtAuthGuard)
  @Get('loginCheck')
  async getLoginCheck(@Request() req){

    console.log('로그인 체크`');
    console.log(req.user);
  }
}