import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
@InputType('ProductInput')
export class Product {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'ID of the Product' })
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Name of the Product' })
  name: string;

  @Column('decimal')
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float, { description: 'Price of the Product' })
  price: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deletedAt?: Date;
}
