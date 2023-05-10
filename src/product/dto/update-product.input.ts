import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'ID of the Product' })
  id: number;

  @IsString()
  @Field(() => String, { description: 'Name of the Product', nullable: true })
  name: string;

  @IsNumber()
  @Field(() => Float, { description: 'Price of the Product', nullable: true })
  price: number;
}
