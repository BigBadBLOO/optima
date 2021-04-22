import {Field, InputType, Int} from "@nestjs/graphql";
import {User} from "../../../user/user.entity";
import {Offer} from "../../platform.entity";


@InputType("AddWorkerDTO")
export class AddWorkerDTO{
    @Field()
    platform: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field({nullable: true})
    password: string;

    @Field()
    group: string;

    @Field()
    status: boolean;

    @Field( () => [User],{nullable: true})
    children?: User[];

    @Field( () => User,{nullable: true})
    parent?: User;

    @Field( () => [Offer],{nullable: true})
    offers?: Offer[];
}