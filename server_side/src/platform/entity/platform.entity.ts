import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/user.entity';

export enum PlatformType {
  AgencyLidgen = 'AgencyLidgen',
  TrafficArbitrage = 'TrafficArbitrage',
}

@ObjectType()
@InputType('PlatformInput')
@Entity()
export class Platform {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  platformName: string;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: PlatformType,
    default: PlatformType.AgencyLidgen,
  })
  type: PlatformType;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.platforms)
  user: User;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.platform)
  users: User;
}

@ObjectType()
export class UsersAndCount {
  @Field(() => [User])
  users: User[];

  @Field(() => Number)
  count: number;
}

@InputType()
export class SortBy {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  desc: boolean;
}

@InputType()
export class Pagination {
  @Field(() => Number, { nullable: true })
  pageIndex: number;

  @Field(() => Number, { nullable: true })
  pageSize: number;

  @Field(() => [SortBy], { nullable: true })
  sortBy: SortBy[];
}

@InputType()
export class DateRange {
  @Field(() => Date, { nullable: true })
  date_start: Date;

  @Field(() => Date, { nullable: true })
  date_end: Date;
}
