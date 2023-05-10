import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductInput: CreateProductInput) {
    return this.productRepository.save(createProductInput);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const product = await this.findOne(id);

    if (!product) {
      throw new Error(`Product with Product_Id ${id} Not Found`);
    }

    return this.productRepository.save({
      ...product,
      ...updateProductInput,
    });
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    if (!product) {
      throw new Error(`Product with Product_Id ${id} Not Found`);
    }

    await this.productRepository.softDelete(id);

    return product;
  }
}
