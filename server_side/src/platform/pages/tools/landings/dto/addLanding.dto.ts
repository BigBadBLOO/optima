import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../../../../user/user.entity';
import { Offer } from '../../../../entity/offers.entity';
import {
  OfferFlow,
  OfferPayment,
} from '../../../../entity/offers.addition.entity';
import {Platform} from "../../../../entity/platform.entity";

@InputType('AddLandingDTO')
export class AddLandingDTO {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  isLanding: boolean;

  @Field({ nullable: true })
  redirect: boolean;

  @Field({ nullable: true })
  url: string;

  @Field(() => User, { nullable: true })
  account: User;

  @Field(() => Offer, { nullable: true })
  offer: Offer;

  @Field(() => OfferFlow, { nullable: true })
  flow: OfferFlow;

  @Field(() => OfferPayment, { nullable: true })
  payment: OfferPayment;

  @Field(() => Platform, { nullable: true })
  platform: Platform;
}
