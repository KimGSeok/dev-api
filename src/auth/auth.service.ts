import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConnectionService } from "src/connection/connection.service";
import { checkUserQuery, getUserInfo } from "src/user/user.query";

@Injectable()
export class AuthService {

  constructor(
    private connection: ConnectionService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(id: string, password: string) {
    try {

      const [response, field] = await this.connection.connectionPool.query(checkUserQuery, [id]);

      if(response[0].cnt > 0 && await bcrypt.compare(password, response[0].password)){
        return { id, password }
      }
      else
        return null;
    } catch (error) {
      console.log('회원 로그인 검증 로직 에러발생');
      console.error(error);
      return error;
    }
  }

  async login(user: any) {
    try {

      // 사용자 정보 조회해서 id, count, password, uuid를 담아서 뱉기
      const [response, field] = await this.connection.connectionPool.query(getUserInfo, [user.id]);
      const payload = response[0];

      return {
        accessToken: this.jwtService.sign(payload)
      }
    } catch (error) {
      console.log('회원 로그인 로직 에러발생');
      console.error(error);
      return error;
    }
  }
}