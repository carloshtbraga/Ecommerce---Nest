import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { UserType, UserStatus, ApprovalStatus } from '@prisma/client';

registerEnumType(UserType, {
  name: 'UserType',
  description: 'Type of the user',
});
registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'Current status of the user',
});
registerEnumType(ApprovalStatus, {
  name: 'ApprovalStatus',
  description: 'Approval status of the user',
});

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true, description: 'Name of the user' })
  name?: string;

  @Field(() => String, { nullable: true, description: 'Email of the user' })
  email?: string;

  @Field(() => UserType, {
    nullable: true,
    description: 'Type of the user (individual or legal entity)',
  })
  type?: UserType;

  @Field(() => UserStatus, {
    nullable: true,
    description: 'Current status of the user',
  })
  status?: UserStatus;

  @Field(() => String, {
    nullable: true,
    description: 'Phone number of the user',
  })
  phone?: string;

  @Field(() => ApprovalStatus, {
    nullable: true,
    description: 'Approval status of the user',
  })
  approvalStatus?: ApprovalStatus;

  @Field(() => String, {
    nullable: true,
    description: 'Reason for rejection, if applicable',
  })
  rejectedReason?: string;
}
