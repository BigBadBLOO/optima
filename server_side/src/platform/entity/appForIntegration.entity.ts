import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformType } from './platform.entity';

export enum AppCategory {
  SOURCE_TRAFFIC = 'SOURCE_TRAFFIC',
  PARTNER = 'PARTNER',
}

@ObjectType()
@InputType('AppForIntegrationInput')
@Entity()
export class AppForIntegration {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  uid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  key: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  version: string;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: AppCategory,
    default: AppCategory.SOURCE_TRAFFIC,
  })
  category: AppCategory;

  @Field(() => [AppForIntegrationByPlatformType], { nullable: true })
  @OneToMany(
    () => AppForIntegrationByPlatformType,
    (type) => type.appForIntegration,
  )
  platformTypes: AppForIntegrationByPlatformType[];

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  utm_source: string;
}

@ObjectType()
@InputType('AppForIntegrationByPlatformTypeInput')
@Entity()
export class AppForIntegrationByPlatformType {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => AppForIntegration, { nullable: true })
  @ManyToOne(() => AppForIntegration, (app) => app.platformTypes)
  appForIntegration: AppForIntegration;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: PlatformType,
    default: PlatformType.AgencyLidgen,
  })
  platformsType: PlatformType;
}
