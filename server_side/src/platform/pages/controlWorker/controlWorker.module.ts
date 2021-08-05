//core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../../user/user.entity';
import { ControlWorkerResolver } from './controlWorker.resolver';
import { ControlWorkerService } from './controlWorker.service';
import { Platform } from '../../entity/platform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Platform])],
  providers: [ControlWorkerService, ControlWorkerResolver],
  exports: [ControlWorkerService],
})
export class ControlWorkerModule {}
