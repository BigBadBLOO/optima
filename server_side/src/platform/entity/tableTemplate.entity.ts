import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { TableColTemplate } from './tableColTemplate.entity';

@ObjectType()
@InputType('TableTemplateInput')
@Entity()
export class TableTemplate {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  table: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: true, default: false })
  selected: boolean;

  @Field(() => [TableColTemplate], { nullable: true })
  @OneToMany(() => TableColTemplate, (col) => col.template, {
    cascade: true,
  })
  tableCols: TableColTemplate;
}
