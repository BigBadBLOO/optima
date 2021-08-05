import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../user/user.entity';
import { Platform } from '../../../entity/platform.entity';
import { FlowService } from './flows.service';
import { FlowsResolver } from './flows.resolver';
import { Flow, FlowDomain, LandingsByFlow } from '../../../entity/flow.entity';
import { UserModule } from '../../../../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Platform,
      Flow,
      FlowDomain,
      LandingsByFlow,
    ]),
    HttpModule,
    UserModule,
  ],
  providers: [FlowService, FlowsResolver],
  exports: [FlowService],
})
export class FlowsModule {}
