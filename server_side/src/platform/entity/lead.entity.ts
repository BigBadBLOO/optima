import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { Landing } from './landing.entity';
import { Platform } from './platform.entity';
import { IntegrationUsers } from './IntegrtionUsers.entity';
import { Offer } from './offers.entity';
import { Flow } from './flow.entity';
import {AppForIntegration} from "./appForIntegration.entity";

export enum LeadStatus {
  NEW = 'NEW',
  ACCEPT = 'ACCEPT',
  WAIT = 'WAIT',
  AVOID = 'AVOID',
}

@ObjectType()
@InputType('LeadInput')
@Entity()
export class Lead {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  uid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: false })
  isDouble: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
  payment: number;

  @Field({ nullable: true })
  @CreateDateColumn()
  date_create: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  birth: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  comment: string;

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform)
  platform: Platform;

  @Field(() => IntegrationUsers, { nullable: true })
  @ManyToOne(() => IntegrationUsers)
  account: IntegrationUsers;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  user: User;

  @Field(() => AppForIntegration, { nullable: true })
  @ManyToOne(() => AppForIntegration)
  app: AppForIntegration;

  @Field(() => AppForIntegration, { nullable: true })
  @ManyToOne(() => AppForIntegration)
  pp: AppForIntegration;

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer)
  offer: Offer;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  offer_name: string;

  @Field(() => Flow, { nullable: true })
  @ManyToOne(() => Flow)
  flow: Flow;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  flow_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '-' })
  geo: string;

  @Field(() => Landing, { nullable: true })
  @ManyToOne(() => Landing)
  prelanding: Landing;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  prelanding_name: string;

  @Field(() => Landing, { nullable: true })
  @ManyToOne(() => Landing)
  landing: Landing;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  landing_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  addition_comment: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  campaign_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  adset_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  ad_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  ad_id: string;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status: LeadStatus;

  @Field({ nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  date_status: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  ip: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  user_agent: string;
}

@ObjectType()
export class LeadsAndCount {
  @Field(() => [Lead])
  leads: Lead[];

  @Field(() => Number)
  count: number;
}
