import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TableTemplate } from './tableTemplate.entity';

@ObjectType()
@InputType('TableColTemplateInput')
@Entity()
export class TableColTemplate {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => TableTemplate, { nullable: true })
  @ManyToOne(() => TableTemplate, (table) => table.tableCols)
  template: TableTemplate;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  col: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  color: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: '' })
  width: string;
}
