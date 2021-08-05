import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  OfferByUser,
  OfferCampaignId,
  OfferFlow,
  OfferPayment,
  OfferSource,
} from './offers.addition.entity';
import { User } from '../../user/user.entity';
import { Platform } from './platform.entity';
import {AppForIntegration} from "./appForIntegration.entity";

@ObjectType()
@InputType('OfferInput')
@Entity()
export class Offer {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  uid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: true })
  status: boolean;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  comment: string;

  @Field(() => AppForIntegration, { nullable: true })
  @ManyToOne(() => AppForIntegration)
  app: AppForIntegration;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  account: User;

  @Field(() => [OfferPayment], { nullable: true })
  @OneToMany(() => OfferPayment, (payment) => payment.offer, {
    cascade: true,
  })
  payments: OfferPayment[];

  @Field(() => [OfferSource], { nullable: true })
  @OneToMany(() => OfferSource, (source) => source.offer, {
    cascade: true,
  })
  sources: OfferSource[];

  @Field(() => [OfferFlow], { nullable: true })
  @OneToMany(() => OfferFlow, (flow) => flow.offer, {
    cascade: true,
  })
  flows: OfferFlow[];

  @Field(() => [OfferByUser], { nullable: true })
  @OneToMany(() => OfferByUser, (el) => el.offer, {
    cascade: true,
  })
  offerByUser: OfferByUser[];

  @Field(() => [OfferCampaignId], { nullable: true })
  @OneToMany(() => OfferCampaignId, (campaign) => campaign.offer, {
    cascade: true,
  })
  campaignId: OfferCampaignId[];

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform)
  platform: Platform;
}

@ObjectType()
export class OffersAndCount {
  @Field(() => [Offer])
  offers: Offer[];

  @Field(() => Number)
  count: number;
}
