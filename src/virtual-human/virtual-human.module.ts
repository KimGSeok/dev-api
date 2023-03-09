import { Module } from "@nestjs/common";
import { VirtualHumanController } from "./virtual-human.controller";
import { VirtualHumanService } from "./virtual-human.service";

@Module({
  imports: [],
  controllers: [VirtualHumanController],
  providers: [VirtualHumanService],
})

export class VirtualHumanModule {}