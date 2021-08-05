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
import { CabinetIntegration } from './cabinetIntegration.entity';
import { Platform } from './platform.entity';

@ObjectType()
@InputType('IntegrationUsersInput')
@Entity()
export class IntegrationUsers {
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
  token: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  comment: string;

  @Field(() => AppForIntegration, { nullable: true })
  @ManyToOne(() => AppForIntegration)
  app: AppForIntegration;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz' })
  token_date_update: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  user: User;

  @Field(() => [CabinetIntegration], { nullable: true })
  @OneToMany(() => CabinetIntegration, (cabinets) => cabinets.account)
  cabinets: CabinetIntegration[];

  @Field(() => Platform, { nullable: true })
  @ManyToOne(() => Platform)
  platform: Platform;
}
