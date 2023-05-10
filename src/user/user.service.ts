import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { AddOrderInput } from './dto/add-order.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private productService: ProductService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.userRepository.save(createUserInput);

    return this.findOne(user.id);
  }

  findAll() {
    return this.userRepository.find({
      relations: {
        orders: true,
      },
    });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(`User with User_id ${id} Not Found`);
    }

    return this.userRepository.save({
      ...user,
      ...updateUserInput,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(`User with User_id ${id} Not Found`);
    }

    await this.userRepository.softDelete(id);

    return user;
  }

  async addOrder(addOrderInput: AddOrderInput) {
    const user = await this.findOne(addOrderInput.userId);

    if (!user) {
      throw new Error(`User with User_id ${addOrderInput.userId} Not Found`);
    }

    const product = await this.productService.findOne(addOrderInput.productId);

    if (!product) {
      throw new Error(
        `Product with Product_Id ${addOrderInput.productId} Not Found`,
      );
    }

    if (user.orders.some((e) => e.id === product.id)) {
      throw new Error(`User already has item placed orders`);
    }

    user.orders = [...user.orders, product];
    await this.userRepository.save(user);

    return user;
  }

  async removeOrder(removeOrderInput: AddOrderInput) {
    const { userId, productId } = removeOrderInput;
    const user = await this.findOne(userId);

    if (!user) {
      throw new Error(`User with User_id ${userId} Not Found`);
    }

    if (!user.orders.some((e) => e.id === productId)) {
      throw new Error(
        `User with User_id ${userId} has not ordered Product with product_id ${productId}`,
      );
    }

    user.orders = user.orders.filter(
      (e) => e.id !== removeOrderInput.productId,
    );
    await this.userRepository.save(user);

    return user;
  }
}
