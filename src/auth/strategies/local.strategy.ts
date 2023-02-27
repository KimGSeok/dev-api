import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthService) {
    super();
  }

  async validate(id: string, password: string): Promise<any> {
    console.log('야호');
    const user = await this.service.validateUser();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}