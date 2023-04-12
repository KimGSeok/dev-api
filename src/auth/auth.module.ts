import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConnectionService } from "src/connection/connection.service";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' }
    })
  ],
  controllers: [],
  providers: [AuthService, ConnectionService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})

export class AuthModule { }