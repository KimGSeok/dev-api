import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Token Type Bearer
      ignoreExpiration: false, // Expire Token Can't Use
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: any): Promise<any>{
    // TODO AccessToken 검증 및 확인
    return payload;
  }
}
