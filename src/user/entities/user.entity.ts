import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  Entity,
  DeleteDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'ID of the User' })
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Name of the User' })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String, { description: 'Email Address of the User' })
  email: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float, { description: 'Age of the User' })
  age: number;

  @ManyToMany(() => Product)
  @JoinTable()
  @Field(() => [Product])
  orders: Product[];

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deletedAt?: Date;
}
