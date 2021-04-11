import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Platform} from "../platform/platform.entity";


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
@Entity()
@Index(["email", "platform"], { unique: true })
export class User {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ nullable: false, default: ''})
    username: string;

    @Field()
    @Column({ nullable: false, default: ''})
    email: string;

    @Field()
    @Column({ nullable: false, default: ''})
    password: string;

    @Field()
    @Column({ default: false })
    isConfirmEmail: boolean;

    @Field()
    @Column({ default: false })
    twoAuth: boolean;

    @Field(type => Int)
    @Column({ default: 0 })
    balance: number;

    @Field()
    @Column({
        type: "enum",
        enum: UserGroup,
        default: UserGroup.CLIENT
    })
    group: UserGroup;

    @Field(() => [Platform], { nullable: true })
    @OneToMany(() => Platform, platform => platform.user)
    platforms: Platform[];

    @Field(() => Platform, { nullable: true })
    @ManyToOne(() => Platform, platform => platform.users)
    platform: Platform
}

@ObjectType()
export class UserWithToken extends User{
    @Field(type => String)
    token: string
}


