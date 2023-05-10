import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Name of the User' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String, { description: 'Email Address of the User' })
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Age of the User' })
  age: number;
}
