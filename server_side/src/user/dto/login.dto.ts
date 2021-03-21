import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class LoginUserDTO{
    @Field()
    email: string;
    @Field()
    password: string;
}