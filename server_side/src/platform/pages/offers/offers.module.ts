import { HttpModule, Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from '../../entity/offers.entity';
import { OffersResolver } from './offers.resolver';
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
import { UserService } from '../../../user/user.service';
import {UserModule} from "../../../user/user.module";

@Module({
  imports: [
    UserModule,
    HttpModule,
    TypeOrmModule.forFeature([
      User,
      Platform,
      Offer,
      IntegrationUsers,
      OfferByUser,
      OfferCampaignId,
      OfferFlow,
      OfferPayment,
      OfferSource,
    ]),
  ],
  providers: [OffersService, OffersResolver],
  exports: [OffersService],
})
export class OffersModule {}
