import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'ID of the User' })
  id: number;

  @IsString()
  @Field(() => String, { description: 'Name of the User', nullable: true })
  name: string;

  @IsString()
  @IsEmail()
  @Field(() => String, {
    description: 'Email Address of the User',
    nullable: true,
  })
  email: string;

  @IsNumber()
  @Field(() => Int, { description: 'Age of the User', nullable: true })
  age: number;
}
