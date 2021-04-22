//core
import {Field, InputType, Int, ObjectType} from "@nestjs/graphql";
import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

//entity
import {Offer, Platform} from "../platform/platform.entity";


export enum UserGroup {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT",
    CLIENT_ADMIN = "CLIENT_ADMIN",
    CLIENT_PROJECT_MANAGER = "CLIENT_PROJECT_MANAGER",
    CLIENT_TEAM_LEAD = "CLIENT_TEAM_LEAD",
    CLIENT_TRAFFIC_MANAGER = "CLIENT_TRAFFIC_MANAGER",
    CLIENT_MANAGER = "CLIENT_MANAGER",
    CLIENT_CLIENT = "CLIENT_CLIENT",
    CLIENT_CONTRACTOR = "CLIENT_CONTRACTOR",
}

@ObjectType()
@InputType('UserInput')
@Entity()
@Index(["email", "platform"], {unique: true})
export class User {
    @Field(type => Int, {nullable: true})
    @PrimaryGeneratedColumn()
    id: number;

    @Field({nullable: true})
    @Column({nullable: false, default: ''})
    username: string;

    @Field({nullable: true})
    @Column({nullable: false, default: ''})
    email: string;

    @Field({nullable: true})
    @Column({nullable: false, default: ''})
    password: string;

    @Field({nullable: true})
    @Column({default: false})
    isConfirmEmail: boolean;

    @Field({nullable: true})
    @Column({default: false})
    twoAuth: boolean;

    @Field(type => Int, {nullable: true})
    @Column({default: 0})
    balance: number;

    @Field({nullable: true})
    @Column({
        type: "enum",
        enum: UserGroup,
        default: UserGroup.CLIENT
    })
    group: UserGroup;

    // for platform's work and their users
    @Field(() => [Platform], {nullable: true})
    @OneToMany(() => Platform, platform => platform.user)
    platforms: Platform[];

    @Field(() => Platform, {nullable: true})
    @ManyToOne(() => Platform, platform => platform.users)
    platform: Platform

    @Field({nullable: true})
    @Column({default: true})
    status: boolean;

    @Field(() => User, {nullable: true})
    @ManyToOne(type => User, user => user.children)
    parent: User;

    @Field(() => [User], {nullable: true})
    @OneToMany(type => User, user => user.parent)
    children: User[];

    @Field(() => [Offer], {nullable: true})
    @OneToMany(type => Offer, offer => offer.user)
    offers: Offer[];
}


@ObjectType()
export class UserWithToken extends User {
    @Field(type => String)
    token: string
}




