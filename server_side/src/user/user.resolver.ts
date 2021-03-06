import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User, UserWithToken } from './user.entity';
import { UserService } from './user.service';
import { GqlAuthGuard } from './auth/gql-auth.guard';
import { SignUpUserDTO } from './dto/signUp.dto';
import { LoginUserDTO } from './dto/login.dto';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user_id: number): Promise<User | Error> {
    return await this.userService.findUser(user_id);
  }

  @Mutation(() => UserWithToken)
  async login(
    @Args('loginData') loginData: LoginUserDTO,
  ): Promise<UserWithToken | Error> {
    return await this.userService.login(loginData);
  }

  @Mutation(() => UserWithToken)
  async signUp(
    @Args('signUpData') signUpData: SignUpUserDTO,
  ): Promise<UserWithToken> {
    return await this.userService.signUp(signUpData);
  }
}
