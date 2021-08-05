import { Field, InputType } from '@nestjs/graphql';

@InputType('DeleteLandingDTO')
export class DeleteLandingDTO {
  @Field(() => [Number])
  id: number[];
}
