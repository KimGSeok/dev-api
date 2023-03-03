import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }

  async validateUser(id: string, password: string) {
    try {

      // TODO 등록된 회원정보와 일치하는지 확인(암호화 및 복호화 확인)
      if (id === 'admin@dooboon.com' && password === 'admin1234!@')
        return { id, password };
      else
        return null;
    } catch (error) {
      console.log('회원 로그인 검증 로직 에러발생');
      console.error(error);
      return error;
    }
  }

  async login(user: object[]) {
    try {

      const payload = { ...user };

      // TODO JWT Token 발급 로직 및 Return

    } catch (error) {

    }
  }
}