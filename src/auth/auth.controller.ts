import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
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
    console.log(44);
    try {
      console.log(req.body);
    } catch (error) {

    }
  }
}