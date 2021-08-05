import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Landing } from './landing.entity';
import { Flow } from './flow.entity';

@ObjectType()
@InputType('StorageFlowInput')
@Entity()
export class StorageFlow {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Landing, { nullable: true })
  @ManyToOne(() => Landing)
  prelanding: Landing;

  @Field(() => Landing, { nullable: true })
  @ManyToOne(() => Landing)
  landing: Landing;

  @Field(() => Flow, { nullable: true })
  @ManyToOne(() => Flow)
  flow: Flow;

  @Field({ nullable: true })
  @Column({ nullable: false, default: '' })
  utm: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: false, default: false })
  cameToLanding: boolean;

  @Field({ nullable: true })
  @Column({ nullable: false, default: false })
  isLeadCame: boolean;
}
