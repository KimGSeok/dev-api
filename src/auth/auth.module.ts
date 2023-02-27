import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    PassportModule,
    UserModule,
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})

export class AuthModule { }