import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ApiFlowDTO {
  @Field()
  id: string;

  @Field()
  utm_content: string;
}

@InputType()
export class ApiLandingDTO {
  @Field()
  id: string;

  @Field()
  landing_id: string;

  @Field()
  utm_content: string;

  @Field()
  storage_id: string;
}

@InputType()
export class ApiLandingLeadDTO {
  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  birth: string;

  @Field()
  comment: string;

  @Field()
  storage_id: string;
}
