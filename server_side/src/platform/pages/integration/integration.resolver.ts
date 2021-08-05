//core
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../user/auth/gql-auth.guard';
import { CurrentUser } from '../../../user/user.resolver';
import { IntegrationService } from './integration.service';

// entity
import { AppForIntegration } from '../../entity/appForIntegration.entity';
import { IntegrationUsers } from '../../entity/IntegrtionUsers.entity';
import { CabinetIntegration } from '../../entity/cabinetIntegration.entity';
import {StatusAccountDto} from "./dto/statusAccount.dto";

@Resolver()
export class IntegrationResolver {
  constructor(
    @Inject(IntegrationService)
    private integrationService: IntegrationService,
  ) {}

  @Query(() => [AppForIntegration])
  @UseGuards(GqlAuthGuard)
  async getListIntegrationApps(
    @Args('platformName') platformName: string,
  ): Promise<AppForIntegration[]> {
    return await this.integrationService.getListIntegrationApp(platformName);
  }

  @Query(() => [IntegrationUsers])
  @UseGuards(GqlAuthGuard)
  async getListIntegrationAccounts(
    @CurrentUser() user_id: number,
    @Args('platformName') platformName: string,
  ): Promise<IntegrationUsers[]> {
    return await this.integrationService.getListIntegrationAccounts(
      user_id,
      platformName,
    );
  }

  @Query(() => [StatusAccountDto])
  @UseGuards(GqlAuthGuard)
  async getAccountsStatus(
    @Args('accounts_id', { type: () => [Number] }) accounts_id: number[],
  ): Promise<StatusAccountDto[]> {
    return this.integrationService.statusAccounts(accounts_id);
  }

  @Mutation(() => IntegrationUsers)
  @UseGuards(GqlAuthGuard)
  async addIntegrationAccount(
    @Args('uid') uid: string,
    @Args('name') name: string,
    @Args('token') token: string,
    @Args('app_id') app_id: number,
    @Args('platformName') platformName: string,
    @CurrentUser() user_id: number,
  ): Promise<IntegrationUsers> {
    return await this.integrationService.addIntegrationAccount(
      uid,
      name,
      token,
      app_id,
      user_id,
      platformName,
    );
  }

  @Mutation(() => CabinetIntegration)
  @UseGuards(GqlAuthGuard)
  async setCabinetForGetStatistic(
    @Args('cabinet_id') cabinets_id: number,
    @Args('factor') factor: number,
    @Args('value') value: boolean,
  ): Promise<CabinetIntegration> {
    return await this.integrationService.setCabinetForGetStatistic(
      cabinets_id,
      factor,
      value,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteListIntegrationAccounts(
    @Args('accounts_id', { type: () => [Number] }) accounts_id: number[],
  ): Promise<string> {
    return await this.integrationService.deleteListIntegrationAccounts(
      accounts_id,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteListIntegrationCabinets(
    @Args('cabinets_id', { type: () => [Number] }) cabinets_id: [number],
  ): Promise<string> {
    return await this.integrationService.deleteListIntegrationCabinets(
      cabinets_id,
    );
  }
}
