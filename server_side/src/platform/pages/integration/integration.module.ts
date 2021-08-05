//core
import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Platform } from '../../entity/platform.entity';
import { IntegrationService } from './integration.service';
import { IntegrationResolver } from './integration.resolver';
import {
  AppForIntegration,
  AppForIntegrationByPlatformType,
} from '../../entity/appForIntegration.entity';
import { IntegrationUsers } from '../../entity/IntegrtionUsers.entity';
import { User } from '../../../user/user.entity';
import { FacebookIntegrationService } from './externalServices/facebook.service';
import { CabinetIntegration } from '../../entity/cabinetIntegration.entity';
import { ProfitPayIntegrationService } from './externalServices/profitPay.service';
import {FacebookResolver} from "./externalResolver/facebook.resolver";
import {ProfitPayResolver} from "./externalResolver/profitPay.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Platform,
      AppForIntegration,
      AppForIntegrationByPlatformType,
      IntegrationUsers,
      CabinetIntegration,
    ]),
    HttpModule,
  ],
  providers: [
    IntegrationService,
    IntegrationResolver,
    FacebookIntegrationService,
    FacebookResolver,
    ProfitPayIntegrationService,
    ProfitPayResolver,
  ],
  exports: [IntegrationService],
})
export class IntegrationModule {}
