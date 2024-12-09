import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserSendEmailVerificationInput {
  @Field()
  @IsString()
  public slug: string;
}
