//core
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { PlatformService } from './platform.service';
import {Platform} from "./platform.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Platform]),
  ],
  providers: [PlatformService]
})
export class PlatformModule {}
