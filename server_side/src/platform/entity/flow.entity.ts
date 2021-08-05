import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { AppForIntegration } from './appForIntegration.entity';
import { Landing } from './landing.entity';
import { Platform } from './platform.entity';

@ObjectType()
@InputType('FlowDomainInput')
@Entity()
export class FlowDomain {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  url: string;

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform)
  platform: Platform;
}

@ObjectType()
@InputType('FlowInput')
@Entity()
export class Flow {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  redirect: boolean;

  @Field(() => FlowDomain, { nullable: true })
  @ManyToOne(() => FlowDomain)
  domain: FlowDomain;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  url: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  account: User;

  @Field(() => AppForIntegration, { nullable: true })
  @ManyToOne(() => AppForIntegration, {
    onDelete: 'CASCADE',
  })
  app: AppForIntegration;

  @Field(() => [LandingsByFlow], { nullable: true })
  @OneToMany(() => LandingsByFlow, (el) => el.flow, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  landingsByFlow: LandingsByFlow[];

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform)
  platform: Platform;
}

@ObjectType()
@InputType('LandingsByFlowInput')
@Entity()
export class LandingsByFlow {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Landing, { nullable: true })
  @ManyToOne(() => Landing, (landing) => landing.landingsByFlow, {
    // onDelete: 'CASCADE',
    // cascade: true,
  })
  landing: Landing;

  @Field(() => Flow, { nullable: true })
  @ManyToOne(() => Flow, {
    // onDelete: 'CASCADE',
    // cascade: true,
  })
  flow: Flow;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: false, default: 0 })
  percent: number;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  useInFlow: boolean;
}

@ObjectType()
export class FlowsAndCount {
  @Field(() => [Flow])
  flows: Flow[];

  @Field(() => Number)
  count: number;
}
