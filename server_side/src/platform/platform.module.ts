//core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlatformResolver } from './platform.resolver';
import { PlatformService } from './platform.service';
import { Platform } from './entity/platform.entity';
import { OffersModule } from './pages/offers/offers.module';
import { UserModule } from '../user/user.module';
import { ControlWorkerModule } from './pages/controlWorker/controlWorker.module';
import { IntegrationModule } from './pages/integration/integration.module';
import { LandingsModule } from './pages/tools/landings/landings.module';
import { FlowsModule } from './pages/tools/flows/flows.module';
import { LeadsModule } from './pages/leads/leads.module';
import { TableTemplate } from './entity/tableTemplate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Platform, TableTemplate]),
    UserModule,
    ControlWorkerModule,
    OffersModule,
    IntegrationModule,
    LandingsModule,
    FlowsModule,
    LeadsModule,
  ],
  providers: [PlatformService, PlatformResolver],
  exports: [PlatformService],
})
export class PlatformModule {}
