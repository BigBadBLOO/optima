import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteWorkerDTO {
  @Field(() => [Number])
  id: number[];
}
