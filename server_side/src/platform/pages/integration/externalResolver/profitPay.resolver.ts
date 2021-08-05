//core
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../../user/auth/gql-auth.guard';
import { FacebookIntegrationService } from '../externalServices/facebook.service';

// entity
import { ProfitPayIntegrationService } from '../externalServices/profitPay.service';

@Resolver()
export class ProfitPayResolver {
  constructor(
    @Inject(ProfitPayIntegrationService)
    private profitPayIntegrationService: ProfitPayIntegrationService,
  ) {}

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async getAccountStatusProfitPay(
    @Args('account_id') account_id: number,
  ): Promise<boolean> {
    return await this.profitPayIntegrationService.statusAccount(account_id);
  }
}
