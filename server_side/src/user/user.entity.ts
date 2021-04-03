import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Platform} from "../platform/platform.entity";


export enum UserGroup {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT",
}


@ObjectType()
@Entity()
export class User {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ nullable: false, default: ''})
    username: string;

    @Field()
    @Column({ nullable: false, default: '', unique: true})
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
}

@ObjectType()
export class UserWithToken extends User{
    @Field(type => String)
    token: string
}


