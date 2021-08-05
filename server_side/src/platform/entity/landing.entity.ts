import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OfferFlow, OfferPayment } from './offers.addition.entity';
import { User } from '../../user/user.entity';
import { Offer } from './offers.entity';
import { Platform } from './platform.entity';
import { LandingsByFlow } from './flow.entity';

@ObjectType()
@InputType('LandingInput')
@Entity()
export class Landing {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  isLanding: boolean;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  redirect: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  account: User;

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, {
    onDelete: 'SET NULL',
  })
  offer: Offer;

  @Field(() => OfferFlow, { nullable: true })
  @ManyToOne(() => OfferFlow, {
    onDelete: 'SET NULL',
  })
  flow: OfferFlow;

  @Field(() => OfferPayment, { nullable: true })
  @ManyToOne(() => OfferPayment, {
    onDelete: 'SET NULL',
  })
  payment: OfferPayment;

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform)
  platform: Platform;

  @Field(() => [LandingsByFlow], { nullable: true })
  @OneToMany(() => LandingsByFlow, (lbf) => lbf.landing, {
    cascade: true,
  })
  landingsByFlow: LandingsByFlow;
}

@ObjectType()
export class LandingsAndCount {
  @Field(() => [Landing])
  landings: Landing[];

  @Field(() => Number)
  count: number;
}
