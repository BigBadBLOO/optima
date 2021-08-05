//core
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../user/auth/gql-auth.guard';
import { CurrentUser } from '../../../user/user.resolver';
import { OffersService } from './offers.service';

// entity
import { Offer, OffersAndCount } from '../../entity/offers.entity';
import { Pagination } from '../../entity/platform.entity';
import { AddOfferDTO } from './dto/addOffer.dto';
import { UpdateOfferDTO } from './dto/updateOffer.dto';
import { DeleteOfferDTO } from './dto/deleteOffer.dto';

@Resolver()
export class OffersResolver {
  constructor(
    @Inject(OffersService)
    private offersService: OffersService,
  ) {}

  @Query(() => OffersAndCount)
  @UseGuards(GqlAuthGuard)
  async getListOffers(
    @CurrentUser() user_id: number,
    @Args('platformName') platformName: string,
    @Args('pagination') pagination: Pagination,
  ): Promise<OffersAndCount> {
    return await this.offersService.getListOffers(
      user_id,
      platformName,
      pagination,
    );
  }

  @Query(() => [Offer])
  @UseGuards(GqlAuthGuard)
  async getListExternalOffers(
    @Args('account_id') account_id: number,
  ): Promise<Offer[]> {
    return await this.offersService.getListExternalOffers(account_id);
  }

  @Mutation(() => Offer)
  @UseGuards(GqlAuthGuard)
  async addOffer(
    @Args('addOfferData') addOfferData: AddOfferDTO,
    @CurrentUser() user_id: number,
  ): Promise<Offer> {
    return await this.offersService.addOffer(addOfferData, user_id);
  }

  @Mutation(() => Offer)
  @UseGuards(GqlAuthGuard)
  async updateOffer(
    @CurrentUser() user_id: number,
    @Args('updateOfferData') updateOfferData: UpdateOfferDTO,
  ): Promise<Offer> {
    return await this.offersService.updateOffer(user_id, updateOfferData);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteOffer(
    @Args('deleteOfferData') deleteOfferData: DeleteOfferDTO,
  ): Promise<string> {
    return await this.offersService.deleteOffer(deleteOfferData);
  }
}
