//core
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { LandingsService } from './landings.service';
import { Landing, LandingsAndCount } from '../../../entity/landing.entity';
import { GqlAuthGuard } from '../../../../user/auth/gql-auth.guard';
import { CurrentUser } from '../../../../user/user.resolver';
import { Pagination } from '../../../entity/platform.entity';
import { AddLandingDTO } from './dto/addLanding.dto';
import { UpdateLandingDTO } from './dto/updateLanding.dto';
import { DeleteLandingDTO } from './dto/deleteLanding.dto';
// entity

@Resolver()
export class LandingsResolver {
  constructor(
    @Inject(LandingsService)
    private landingService: LandingsService,
  ) {}

  @Query(() => LandingsAndCount)
  @UseGuards(GqlAuthGuard)
  async getListLandings(
    @CurrentUser() user_id: number,
    @Args('platformName') platformName: string,
    @Args('pagination') pagination: Pagination,
    @Args('isLanding') isLanding: boolean,
  ): Promise<LandingsAndCount> {
    return await this.landingService.getListLandings(
      user_id,
      platformName,
      pagination,
      isLanding,
    );
  }

  @Query(() => [Landing])
  @UseGuards(GqlAuthGuard)
  async getLandings(
    @CurrentUser() user_id: number,
    @Args('platformName') platformName: string,
  ): Promise<Landing[]> {
    return await this.landingService.getLandings(user_id, platformName);
  }

  @Mutation(() => Landing)
  @UseGuards(GqlAuthGuard)
  async addLanding(
    @Args('addLandingData') addLandingData: AddLandingDTO,
    @CurrentUser() user_id: number,
  ): Promise<Landing> {
    return await this.landingService.addLanding(addLandingData, user_id);
  }

  @Mutation(() => Landing)
  @UseGuards(GqlAuthGuard)
  async updateLanding(
    @Args('updateLandingData') updateLandingData: UpdateLandingDTO,
  ): Promise<Landing> {
    return await this.landingService.updateLanding(updateLandingData);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteLanding(
    @Args('deleteLandingData') deleteLandingData: DeleteLandingDTO,
  ): Promise<string> {
    return await this.landingService.deleteLanding(deleteLandingData);
  }
}
