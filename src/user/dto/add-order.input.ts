import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AddOrderInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: 'Id of the User' })
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: 'Id of the Product' })
  productId: number;
}
