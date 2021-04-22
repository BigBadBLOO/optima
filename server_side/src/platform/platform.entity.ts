import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Field, InputType, Int, ObjectType} from "@nestjs/graphql";
import {User} from "../user/user.entity";

export enum PlatformType {
    AgencyLidgen = "AgencyLidgen",
    TrafficArbitrage = "TrafficArbitrage"
}


@ObjectType()
@InputType('PlatformInput')
@Entity()
export class Platform {
    @Field(type => Int, {nullable: true})
    @PrimaryGeneratedColumn()
    id: number;

    @Field({nullable: true})
    @Column({nullable: false, default: ''})
    platformName: string;

    @Field({nullable: true})
    @Column({
        type: "enum",
        enum: PlatformType,
        default: PlatformType.AgencyLidgen
    })
    type: PlatformType;

    @Field(() => User,{nullable: true})
    @ManyToOne(() => User, user => user.platforms)
    user: User;

    @Field(() => [User],{nullable: true})
    @OneToMany(() => User, user => user.platform)
    users: User;
}


@ObjectType()
@InputType('OfferInput')
@Entity()
export class Offer {
    @Field(type => Int, {nullable: true})
    @PrimaryGeneratedColumn()
    id: number;

    @Field({nullable: true})
    @Column({nullable: false, default: ''})
    name: string;

    @Field(() => User, {nullable: true})
    @ManyToOne(() => User, user => user.platforms)
    user: User;
}


@ObjectType()
export class UsersAndCount {
    @Field(type => [User])
    users: User[]

    @Field(type => Number)
    count: number
}

@InputType()
export class SortBy {
    @Field(type => String)
    id: string

    @Field(type => Boolean)
    desc: boolean
}

@InputType()
export class Pagination {
    @Field(type => Number, {nullable: true})
    pageIndex: number

    @Field(type => Number, {nullable: true})
    pageSize: number

    @Field(type => [SortBy], {nullable: true})
    sortBy: SortBy[]
}



