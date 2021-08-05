//core
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../user/auth/gql-auth.guard';
import { CurrentUser } from '../../../user/user.resolver';
import { ControlWorkerService } from './controlWorker.service';

// entity
import { User } from '../../../user/user.entity';
import { Pagination, UsersAndCount } from '../../entity/platform.entity';
import { AddWorkerDTO } from './dto/addWorker.dto';
import { DeleteWorkerDTO } from './dto/deleteWorker.dto';
import { UpdateWorkerDTO } from './dto/updateWorker.dto';

@Resolver()
export class ControlWorkerResolver {
  constructor(
    @Inject(ControlWorkerService)
    private controlWorkerService: ControlWorkerService,
  ) {}

  @Query(() => UsersAndCount)
  @UseGuards(GqlAuthGuard)
  async getListWorker(
    @CurrentUser() user_id: number,
    @Args('platformName') platformName: string,
    @Args('pagination') pagination: Pagination,
  ): Promise<UsersAndCount> {
    return await this.controlWorkerService.getListWorker(
      user_id,
      platformName,
      pagination,
    );
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async addWorker(
    @Args('addWorkerData') addWorkerData: AddWorkerDTO,
  ): Promise<User> {
    return await this.controlWorkerService.addWorker(addWorkerData);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateWorker(
    @Args('updateWorkerData') updateWorkerData: UpdateWorkerDTO,
  ): Promise<User> {
    return await this.controlWorkerService.updateWorker(updateWorkerData);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteWorker(
    @Args('deleteWorkerData') deleteWorkerData: DeleteWorkerDTO,
  ): Promise<string> {
    return await this.controlWorkerService.deleteWorker(deleteWorkerData);
  }
}
