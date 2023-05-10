import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ProductService } from '../src/product/product.service';
import { UserService } from '../src/user/user.service';
import * as UserQueries from './requests/user';

import request = require('supertest');

describe('UserResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('createUser', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send(UserQueries.create)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            id: 1,
            name: 'Asad Umar',
            email: 'asad.umar@gmail.com',
            age: 27,
            orders: [],
          });
        });
    });
  });

  describe('fetchOneUser', () => {
    it('should fetch one User', async () => {
      const userService = await app.resolve(UserService);

      await userService.create({
        name: 'Asad Umar',
        age: 27,
        email: 'asad.umar@gmail.com',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(UserQueries.findOne)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.fetchUser).toEqual({
            id: 1,
            name: 'Asad Umar',
            age: 27,
            email: 'asad.umar@gmail.com',
            orders: [],
          });
        });
    });
  });

  describe('fetchAllUser', () => {
    it('should fetch all Users', async () => {
      const userService = await app.resolve(UserService);

      await userService.create({
        name: 'Asad Umar',
        age: 27,
        email: 'asad.umar@gmail.com',
      });

      await userService.create({
        name: 'Jhon Doe',
        age: 27,
        email: 'jhon.doe@gmail.com',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(UserQueries.findAll)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.fetchUsers.length).toEqual(2);
        });
    });
  });

  describe('updateUser', () => {
    it('should update one User keeping rest of the values as is', async () => {
      const userService = await app.resolve(UserService);

      await userService.create({
        name: 'Asad Umar',
        age: 27,
        email: 'asad.umar@gmail.com',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(UserQueries.update)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.updateUser).toEqual({
            id: 1,
            name: 'Asad Umar',
            age: 27,
            email: 'asad.umar@yahoo.com',
          });
        });
    });
  });

  describe('deleteUser', () => {
    it('should (soft) delete the user', async () => {
      const userService = await app.resolve(UserService);

      await userService.create({
        name: 'Asad Umar',
        age: 27,
        email: 'asad.umar@gmail.com',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(UserQueries.remove)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.removeUser).toEqual({
            id: 1,
            name: 'Asad Umar',
            age: 27,
            email: 'asad.umar@gmail.com',
          });
        });
    });
  });

  describe('addOrder', () => {
    it('should add order to the user', async () => {
      const userService = await app.resolve(UserService);
      const productService = await app.resolve(ProductService);

      await userService.create({
        name: 'Asad Umar',
        age: 27,
        email: 'asad.umar@gmail.com',
      });

      await productService.create({
        price: 2.99,
        name: 'Apple',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(UserQueries.addOrder)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.addOrder).toEqual({
            id: 1,
            name: 'Asad Umar',
            age: 27,
            email: 'asad.umar@gmail.com',
            orders: [
              {
                id: 1,
                name: 'Apple',
                price: 2.99,
              },
            ],
          });
        });
    });
  });

  describe('removeOrder', () => {
    it('should remove order from the user', async () => {
      const userService = await app.resolve(UserService);
      const productService = await app.resolve(ProductService);

      const user = await userService.create({
        name: 'Asad Umar',
        age: 27,
        email: 'asad.umar@gmail.com',
      });

      const product = await productService.create({
        price: 2.99,
        name: 'Apple',
      });

      await userService.addOrder({
        productId: product.id,
        userId: user.id,
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(UserQueries.removeOrder)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.removeOrder).toEqual({
            id: 1,
            name: 'Asad Umar',
            age: 27,
            email: 'asad.umar@gmail.com',
            orders: [],
          });
        });
    });
  });
});
