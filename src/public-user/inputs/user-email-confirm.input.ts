import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class UserConfirmEmailInput {
  @Field()
  @IsString()
  @MinLength(6)
  token: string;
}
