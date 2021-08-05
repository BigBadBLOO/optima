import {Field, InputType, ObjectType} from '@nestjs/graphql';

@ObjectType()
@InputType('InputStatusAccountDto')
export class StatusAccountDto {
  @Field()
  id: number;

  @Field()
  status: boolean;
}
