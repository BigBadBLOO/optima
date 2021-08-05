//core
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../user/auth/gql-auth.guard';
import { CurrentUser } from '../../../user/user.resolver';
import { LeadsService } from './leads.service';

// entity
import {DateRange, Pagination} from '../../entity/platform.entity';
import { LeadsAndCount } from '../../entity/lead.entity';

@Resolver()
export class LeadsResolver {
  constructor(
    @Inject(LeadsService)
    private leadsService: LeadsService,
  ) {}

  @Query(() => LeadsAndCount)
  @UseGuards(GqlAuthGuard)
  async getListLeads(
    @CurrentUser() user_id: number,
    @Args('platformName') platformName: string,
    @Args('pagination') pagination: Pagination,
    @Args('dateRange') dateRange: DateRange,
  ): Promise<LeadsAndCount> {
    return await this.leadsService.getListLeads(
      user_id,
      platformName,
      pagination,
      dateRange,
    );
  }
}
