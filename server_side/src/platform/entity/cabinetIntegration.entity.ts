import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IntegrationUsers } from './IntegrtionUsers.entity';

@ObjectType()
@InputType('CabinetIntegrationInput')
@Entity()
export class CabinetIntegration {
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
  @Column({ nullable: true, default: true })
  access_get_statistic: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 1, type: 'float' })
  factor: number;

  @Field(() => IntegrationUsers, { nullable: true })
  @ManyToOne(() => IntegrationUsers, { onDelete: 'CASCADE' })
  account: IntegrationUsers;
}
