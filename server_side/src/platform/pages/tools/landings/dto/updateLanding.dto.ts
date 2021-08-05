import { Field, InputType } from '@nestjs/graphql';
import { Offer } from '../../../../entity/offers.entity';
import { User } from '../../../../../user/user.entity';
import {
  OfferFlow,
  OfferPayment,
} from '../../../../entity/offers.addition.entity';

@InputType('UpdateLandingDTO')
export class UpdateLandingDTO {
  @Field()
  id: number;

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
}
