import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { Offer } from './offers.entity';

@ObjectType()
@InputType('OfferPaymentInput')
@Entity()
export class OfferPayment {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  name: string;

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.payments, {
    onDelete: 'CASCADE',
  })
  offer: Offer;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: false, default: 0 })
  price: number;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: false, default: 0 })
  paymentDesktop: number;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: true })
  paymentMobile: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  currency: string;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: false, default: 0 })
  approve: number;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: true })
  newApprove: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  targetAction: string;
}

@ObjectType()
@InputType('OfferSourceInput')
@Entity()
export class OfferSource {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  name: string;

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.sources, {
    onDelete: 'CASCADE',
  })
  offer: Offer;

  @Field({ nullable: true })
  @Column({ nullable: false, default: false })
  allow: boolean;
}

@ObjectType()
@InputType('OfferFlowInput')
@Entity()
export class OfferFlow {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  uid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.flows, {
    onDelete: 'CASCADE',
  })
  offer: Offer;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  comment: string;
}

@ObjectType()
@InputType('OfferCampaignIdInput')
@Entity()
export class OfferCampaignId {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  uid: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  type: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, {
    onDelete: 'CASCADE',
  })
  offer: Offer;
}

@ObjectType()
@InputType('OfferByUserInput')
@Entity()
export class OfferByUser {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.offerByUser, {
    onDelete: 'CASCADE',
  })
  offer: Offer;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.offerByUser, {
    onDelete: 'CASCADE',
  })
  user: User;
}
