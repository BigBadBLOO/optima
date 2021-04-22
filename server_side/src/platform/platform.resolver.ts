//core
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Inject, UseGuards} from "@nestjs/common";


import {GqlAuthGuard} from "../user/auth/gql-auth.guard";
import {CurrentUser} from "../user/user.resolver";
import {PlatformService} from "./platform.service";

// entity
import {User} from "../user/user.entity";
import {Pagination, UsersAndCount} from "./platform.entity";
import {AddWorkerDTO} from "./controlWorker/dto/addWorker.dto";
import {DeleteWorkerDTO} from "./controlWorker/dto/deleteWorker.dto";
import {UpdateWorkerDTO} from "./controlWorker/dto/updateWorker.dto";


@Resolver(of => User)
export class PlatformResolver {
    constructor(
        @Inject(PlatformService) private platformService: PlatformService,
    ) {
    }

    @Query(returns => UsersAndCount)
    @UseGuards(GqlAuthGuard)
    async getListWorker(
        @CurrentUser() user: User,
        @Args('platformName') platformName: string,
        @Args('pagination') pagination: Pagination
    ): Promise<UsersAndCount> {
        return await this.platformService.getListWorker(user, platformName, pagination);
    }

    @Mutation(returns => String)
    @UseGuards(GqlAuthGuard)
    async addWorker(@Args('addWorkerData') addWorkerData: AddWorkerDTO): Promise<String> {
        return await this.platformService.addWorker(addWorkerData)
    }

    @Mutation(returns => String)
    @UseGuards(GqlAuthGuard)
    async updateWorker(@Args('updateWorkerData') updateWorkerData: UpdateWorkerDTO): Promise<String> {
        return await this.platformService.updateWorker(updateWorkerData)
    }

    @Mutation(returns => String)
    @UseGuards(GqlAuthGuard)
    async deleteWorker(
        @CurrentUser() user: User,
        @Args('deleteWorkerData') deleteWorkerData: DeleteWorkerDTO
    ): Promise<string> {
        return await this.platformService.deleteWorker(deleteWorkerData, user)
    }
}