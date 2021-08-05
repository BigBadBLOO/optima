//core
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//entity
import { Platform } from '../platform/entity/platform.entity';
import { OfferByUser } from '../platform/entity/offers.addition.entity';

export enum UserGroup {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  CLIENT_PROJECT_MANAGER = 'CLIENT_PROJECT_MANAGER',
  CLIENT_TEAM_LEAD = 'CLIENT_TEAM_LEAD',
  CLIENT_TRAFFIC_MANAGER = 'CLIENT_TRAFFIC_MANAGER',
  CLIENT_MANAGER = 'CLIENT_MANAGER',
  CLIENT_CLIENT = 'CLIENT_CLIENT',
  CLIENT_CONTRACTOR = 'CLIENT_CONTRACTOR',
}

@ObjectType()
@InputType('UserInput')
@Entity()
@Index(['email', 'platform'], { unique: true })
export class User {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  password: string;

  @Field({ nullable: true })
  @Column({ default: false })
  isConfirmEmail: boolean;

  @Field({ nullable: true })
  @Column({ default: false })
  twoAuth: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ default: 0 })
  balance: number;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: UserGroup,
    default: UserGroup.CLIENT,
  })
  group: UserGroup;

  // for platform's work and their users
  @Field(() => [Platform], { nullable: true })
  @OneToMany(() => Platform, (platform) => platform.user)
  platforms: Platform[];

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform, (platform) => platform.users)
  platform: Platform;

  @Field({ nullable: true })
  @Column({ default: true })
  status: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.children, {
    onDelete: 'SET NULL',
  })
  parent: User;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.parent)
  children: User[];

  @Field(() => [OfferByUser], { nullable: true })
  @OneToMany(() => OfferByUser, (el) => el.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  offerByUser: OfferByUser[];
}

@ObjectType()
export class UserWithToken extends User {
  @Field(() => String)
  token: string;
}
