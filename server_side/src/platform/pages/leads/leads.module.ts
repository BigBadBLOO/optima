import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsResolver } from './leads.resolver';
import { Offer } from '../../entity/offers.entity';
import { User } from '../../../user/user.entity';
import { Platform } from '../../entity/platform.entity';
import { IntegrationUsers } from '../../entity/IntegrtionUsers.entity';
import {
  OfferByUser,
  OfferCampaignId,
  OfferFlow,
  OfferPayment,
  OfferSource,
} from '../../entity/offers.addition.entity';
import { UserModule } from '../../../user/user.module';
import { Lead } from '../../entity/lead.entity';

@Module({
  imports: [
    UserModule,
    HttpModule,
    TypeOrmModule.forFeature([User, Platform, Lead]),
  ],
  providers: [LeadsService, LeadsResolver],
  exports: [LeadsService],
})
export class LeadsModule {}
