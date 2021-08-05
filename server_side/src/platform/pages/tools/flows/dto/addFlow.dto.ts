import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../../../../user/user.entity';
import { ManyToOne, OneToMany } from 'typeorm';
import { FlowDomain, LandingsByFlow } from '../../../../entity/flow.entity';
import { AppForIntegration } from '../../../../entity/appForIntegration.entity';
import { Platform } from '../../../../entity/platform.entity';

@InputType('AddFlowDTO')
export class AddFlowDto {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  redirect: boolean;

  @Field(() => FlowDomain, { nullable: true })
  domain: FlowDomain;

  @Field(() => User, { nullable: true })
  account: User;

  @Field(() => AppForIntegration, { nullable: true })
  app: AppForIntegration;

  @Field(() => [LandingsByFlow], { nullable: true })
  @OneToMany(() => LandingsByFlow, (el) => el.flow)
  landingsByFlow: LandingsByFlow[];

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform)
  platform: Platform;
}
