//core
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../../user/auth/gql-auth.guard';
import { CurrentUser } from '../../../../user/user.resolver';
import { Pagination } from '../../../entity/platform.entity';
import { AddFlowDto } from './dto/addFlow.dto';
import { UpdateFlowDto } from './dto/updateFlow.dto';
import { DeleteFlowDto } from './dto/deleteFlow.dto';
import { FlowService } from './flows.service';
import { Flow, FlowDomain, FlowsAndCount } from '../../../entity/flow.entity';

// entity

@Resolver()
export class FlowsResolver {
  constructor(
    @Inject(FlowService)
    private flowService: FlowService,
  ) {}

  @Query(() => FlowsAndCount)
  @UseGuards(GqlAuthGuard)
  async getListFlows(
    @CurrentUser() user_id: number,
    @Args('platformName') platformName: string,
    @Args('pagination') pagination: Pagination,
  ): Promise<FlowsAndCount> {
    return await this.flowService.getListFLows(
      user_id,
      platformName,
      pagination,
    );
  }

  @Query(() => [FlowDomain])
  @UseGuards(GqlAuthGuard)
  async getListFlowDomains(
    @Args('platformName') platformName: string,
  ): Promise<FlowDomain[]> {
    return await this.flowService.getListFLowDomains(platformName);
  }

  @Mutation(() => Flow)
  @UseGuards(GqlAuthGuard)
  async addFlow(
    @Args('addFlowData') addFlowData: AddFlowDto,
    @CurrentUser() user_id: number,
  ): Promise<Flow> {
    return await this.flowService.addFLow(addFlowData, user_id);
  }

  @Mutation(() => Flow)
  @UseGuards(GqlAuthGuard)
  async updateFlow(
    @Args('updateFlowData') updateFlowData: UpdateFlowDto,
  ): Promise<Flow> {
    return await this.flowService.updateFlow(updateFlowData);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteFlow(
    @Args('deleteFlowData') deleteFlowData: DeleteFlowDto,
  ): Promise<string> {
    return await this.flowService.deleteFLow(deleteFlowData);
  }
}
