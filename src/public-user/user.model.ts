// src/user/models/user.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { UserStatus, UserType, ApprovalStatus } from '@prisma/client';

@ObjectType()
export class UserModel {
  @Field()
  email: string;

  @Field({ nullable: true })
  status?: UserStatus;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  type?: UserType;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  approvalStatus?: ApprovalStatus;
}
