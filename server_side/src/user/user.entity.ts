import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Field, Int, ObjectType} from "@nestjs/graphql";

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
}

@ObjectType()
export class UserWithToken extends User{
    @Field(type => String)
    token: string
}
