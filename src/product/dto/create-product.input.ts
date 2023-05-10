import { InputType, Float, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Name of the Product' })
  name: string;

  @IsNotEmpty()
  @Field(() => Float, { description: 'Price of the Product' })
  price: number;
}
