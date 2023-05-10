import { Test, TestingModule } from '@nestjs/testing';
import { AddOrderInput } from './dto/add-order.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const mockUser: User = {
  id: 1,
  name: 'Jhon Doe',
  email: 'jhon.doe@gmail.com',
  age: 30,
  orders: [{ id: 1, name: 'Apple', price: 1.99 }],
};

const UserServiceMock = {
  findOne: jest.fn((id: number): User => mockUser),
  findAll: jest.fn((): User[] => [mockUser]),
  create: jest.fn((createUserInput: CreateUserInput): User => mockUser),
  update: jest.fn(
    (id: number, updateUserInput: UpdateUserInput): User => mockUser,
  ),
  remove: jest.fn((id: number) => mockUser),
  addOrder: jest.fn((addOrderInput: AddOrderInput) => mockUser),
  removeOrder: jest.fn((removeOrderInput: AddOrderInput) => mockUser),
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: UserServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single User', async () => {
    const result = await resolver.findOne(1);
    expect(result.id).toEqual(1);
  });

  it('should query all Users', async () => {
    const result = await resolver.findAll();
    expect(Array.isArray(result)).toEqual(true);
  });

  it('should create a User', async () => {
    const result = await resolver.createUser(mockUser);
    expect(result.id).toEqual(1);
  });

  it('Should update a User', async () => {
    const result = await resolver.updateUser(mockUser);
    expect(result.id).toEqual(1);
  });

  it('Should remove a User', async () => {
    const result = await resolver.removeUser(1);
    expect(result.id).toEqual(1);
  });

  it('Should add an order', async () => {
    const result = await resolver.addOrder({ userId: 1, productId: 1 });
    expect(result.id).toEqual(1);
  });

  it('Should remove an order', async () => {
    const result = await resolver.removeOrder({ userId: 1, productId: 1 });
    expect(result.id).toEqual(1);
  });
});
