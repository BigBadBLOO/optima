//core
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {PlatformResolver} from "./platform.resolver";
import { PlatformService } from './platform.service';
import {Offer, Platform} from "./platform.entity";
import {User} from "../user/user.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Platform, Offer]),
  ],
  providers: [PlatformService, PlatformResolver]
})
export class PlatformModule {}
