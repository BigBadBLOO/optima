import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteOfferDTO {
  @Field(() => [Number])
  id: number[];
}
