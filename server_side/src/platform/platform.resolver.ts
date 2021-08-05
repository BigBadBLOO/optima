//core
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../user/auth/gql-auth.guard';
import { CurrentUser } from '../user/user.resolver';
import { PlatformService } from './platform.service';

// entity
import { User } from '../user/user.entity';
import { Pagination, UsersAndCount } from './entity/platform.entity';
import { AddWorkerDTO } from './pages/controlWorker/dto/addWorker.dto';
import { DeleteWorkerDTO } from './pages/controlWorker/dto/deleteWorker.dto';
import { UpdateWorkerDTO } from './pages/controlWorker/dto/updateWorker.dto';
import { UserService } from '../user/user.service';

@Resolver(() => User)
export class PlatformResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(PlatformService) private platformService: PlatformService,
  ) {}
}
