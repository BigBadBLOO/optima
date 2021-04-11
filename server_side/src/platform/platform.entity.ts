import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {User} from "../user/user.entity";

export enum PlatformType {
  AgencyLidgen = "AgencyLidgen",
  TrafficArbitrage = "TrafficArbitrage"
}


@ObjectType()
@Entity()
export class Platform {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false, default: ''})
  platformName: string;

  @Field()
  @Column({
    type: "enum",
    enum: PlatformType,
    default: PlatformType.AgencyLidgen
  })
  type: PlatformType;

  @Field(() => User)
  @ManyToOne(() => User, user => user.platforms)
  user: User;

  @Field(() => [User])
  @OneToMany(() => User, user => user.platform)
  users: User;
}

