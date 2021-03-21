import {Resolver, Query, Args, ResolveField, Parent, Mutation} from '@nestjs/graphql';
import {Inject, UseGuards} from '@nestjs/common';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

import {User, UserWithToken} from "./user.entity";
import {UserService} from "./user.service";
import {LoginUserDTO} from "./dto/login.dto";
import {GqlAuthGuard} from "./auth/gql-auth.guard";


export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);


@Resolver(of => User)
export class UserResolver {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {
    }

    // @Query(returns => User)
    // async user(@Args('id') id: string): Promise<User> {
    //     return await this.userService.findOne(id);
    // }

    @Query(returns => User)
    @UseGuards(GqlAuthGuard)
    getCurrentUser(@CurrentUser() user: User) {
        return this.userService.findByUsername(user.username);
    }
    
    @Mutation(returns => UserWithToken)
    async login(@Args('loginData') loginData: LoginUserDTO): Promise<UserWithToken> {
        return await this.userService.login(loginData)
    }
    // @Query(returns => [User])
    // async users(): Promise<User[]> {
    //     return await this.userService.findAll();
    // }


}