import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GuardApiByDomain } from './authentification';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flow, FlowDomain } from '../platform/entity/flow.entity';
import { Landing } from '../platform/entity/landing.entity';
import { StorageFlow } from '../platform/entity/storage.entity';
import { Lead } from '../platform/entity/lead.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flow, FlowDomain, Landing, StorageFlow, Lead]),
  ],
  controllers: [ApiController],
  providers: [ApiService, GuardApiByDomain],
})
export class ApiModule {}
