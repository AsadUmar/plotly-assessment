import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

const mockProduct: Product = {
  id: 1,
  name: 'Apple',
  price: 1.99,
};

const ProductServiceMock = {
  findOne: jest.fn((id: number): Product => mockProduct),
  findAll: jest.fn((): Product[] => [mockProduct]),
  create: jest.fn(
    (createProductInput: CreateProductInput): Product => mockProduct,
  ),
  update: jest.fn(
    (id: number, updateProductInput: UpdateProductInput): Product =>
      mockProduct,
  ),
  remove: jest.fn((id: number) => mockProduct),
};

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        {
          provide: ProductService,
          useValue: ProductServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single Product', async () => {
    const result = await resolver.findOne(1);
    expect(result.id).toEqual(1);
  });

  it('should query all Products', async () => {
    const result = await resolver.findAll();
    expect(Array.isArray(result)).toEqual(true);
  });

  it('should create a Product', async () => {
    const result = await resolver.createProduct(mockProduct);
    expect(result.id).toEqual(1);
  });

  it('Should update a Product', async () => {
    const result = await resolver.updateProduct(mockProduct);
    expect(result.id).toEqual(1);
  });

  it('Should remove a Product', async () => {
    const result = await resolver.removeProduct(1);
    expect(result.id).toEqual(1);
  });
});
