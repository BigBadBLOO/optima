import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../user/user.entity';
import { Platform } from '../../../entity/platform.entity';
import { Offer } from '../../../entity/offers.entity';
import { LandingsService } from './landings.service';
import { LandingsResolver } from './landings.resolver';
import { Landing } from '../../../entity/landing.entity';
import { UserModule } from '../../../../user/user.module';

@Module({
  imports: [
    HttpModule,
    UserModule,
    TypeOrmModule.forFeature([User, Platform, Offer, Landing]),
  ],
  providers: [LandingsService, LandingsResolver],
  exports: [LandingsService],
})
export class LandingsModule {}
