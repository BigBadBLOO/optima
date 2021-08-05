import { Field, InputType } from '@nestjs/graphql';
import {
  OfferByUser,
  OfferCampaignId,
  OfferFlow,
  OfferPayment,
  OfferSource,
} from '../../../entity/offers.addition.entity';
import { User } from '../../../../user/user.entity';

@InputType('UpdateOfferDTO')
export class UpdateOfferDTO {
  @Field()
  id: number;

  @Field({ nullable: true })
  uid: string;

  @Field({ nullable: true })
  status: boolean;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  comment: string;

  @Field(() => User, { nullable: true })
  account: User;

  @Field(() => [OfferPayment], { nullable: true })
  payments: OfferPayment[];

  @Field(() => [OfferSource], { nullable: true })
  sources: OfferSource[];

  @Field(() => [OfferFlow], { nullable: true })
  flows: OfferFlow[];

  @Field(() => [OfferByUser], { nullable: true })
  offerByUser: OfferByUser[];

  @Field(() => [OfferCampaignId], { nullable: true })
  campaignId: OfferCampaignId[];
}
