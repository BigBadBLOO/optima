import { Field, InputType } from '@nestjs/graphql';

@InputType('DeleteFlowDTO')
export class DeleteFlowDto {
  @Field(() => [Number])
  id: number[];
}
