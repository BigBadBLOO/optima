import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class SignUpUserDTO{
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}