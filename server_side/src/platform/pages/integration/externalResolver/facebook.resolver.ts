//core
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../../user/auth/gql-auth.guard';
import { CurrentUser } from '../../../../user/user.resolver';
import { FacebookIntegrationService } from '../externalServices/facebook.service';

// entity
import { IntegrationUsers } from '../../../entity/IntegrtionUsers.entity';
import { CabinetIntegration } from '../../../entity/cabinetIntegration.entity';

@Resolver()
export class FacebookResolver {
  constructor(
    @Inject(FacebookIntegrationService)
    private facebookIntegrationService: FacebookIntegrationService,
  ) {}

  @Mutation(() => IntegrationUsers)
  @UseGuards(GqlAuthGuard)
  async loginFB(
    @CurrentUser() user_id: number,
    @Args('token') token: string,
  ): Promise<IntegrationUsers> {
    return await this.facebookIntegrationService.loginFB(user_id, token);
  }

  @Mutation(() => [CabinetIntegration])
  @UseGuards(GqlAuthGuard)
  async saveFBCabinets(
    @Args('account_id') account_id: number,
    @Args('cabinets', { type: () => [CabinetIntegration] })
    cabinets: CabinetIntegration[],
  ): Promise<CabinetIntegration[]> {
    return await this.facebookIntegrationService.saveFBCabinets(
      account_id,
      cabinets,
    );
  }

  @Query(() => [CabinetIntegration])
  @UseGuards(GqlAuthGuard)
  async getCabinetsFromFB(
    @Args('account_id') account_id: number,
  ): Promise<CabinetIntegration[]> {
    return await this.facebookIntegrationService.getCabinetsFromFB(account_id);
  }
}
