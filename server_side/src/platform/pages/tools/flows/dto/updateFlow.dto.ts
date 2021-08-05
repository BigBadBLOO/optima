import { Field, InputType } from '@nestjs/graphql';
import { Offer } from '../../../../entity/offers.entity';
import { User } from '../../../../../user/user.entity';
import {OfferFlow, OfferPayment} from "../../../../entity/offers.addition.entity";
import {FlowDomain, LandingsByFlow} from "../../../../entity/flow.entity";
import {AppForIntegration} from "../../../../entity/appForIntegration.entity";
import {ManyToOne, OneToMany} from "typeorm";
import {Platform} from "../../../../entity/platform.entity";

@InputType('UpdateFlowDTO')
export class UpdateFlowDto {
  @Field()
  id: number;

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
