import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class AuthCreateInput {
  @Field()
  @IsEmail()
  @Transform((value) => (value.value as string).trim().toLowerCase())
  public email!: string;

  @Field()
  @MinLength(8)
  public password!: string;
}
