import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ProductService } from '../src/product/product.service';
import * as ProductQueries from './requests/product';

import request = require('supertest');

describe('ProductResolver (e2e)', () => {
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

  describe('createProduct', () => {
    it('should create a new product', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send(ProductQueries.create)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createProduct).toEqual({
            id: 1,
            price: 2.99,
            name: 'Apple',
          });
        });
    });
  });

  describe('fetchOneProduct', () => {
    it('should fetch one Product', async () => {
      const productService = await app.resolve(ProductService);

      await productService.create({
        price: 2.99,
        name: 'Apple',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(ProductQueries.findOne)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.fetchProduct).toEqual({
            id: 1,
            price: 2.99,
            name: 'Apple',
          });
        });
    });
  });

  describe('fetchAllProduct', () => {
    it('should fetch all Products', async () => {
      const productService = await app.resolve(ProductService);

      await productService.create({
        price: 2.99,
        name: 'Apple',
      });

      await productService.create({
        price: 1.59,
        name: 'Banana',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(ProductQueries.findAll)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.fetchProducts.length).toEqual(2);
        });
    });
  });

  describe('updateProduct', () => {
    it('should update one Product keeping rest of the values as is', async () => {
      const productService = await app.resolve(ProductService);

      await productService.create({
        price: 2.99,
        name: 'Apple',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(ProductQueries.update)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.updateProduct).toEqual({
            id: 1,
            price: 1.5,
            name: 'Apple',
          });
        });
    });
  });

  describe('deleteProduct', () => {
    it('should (soft) delete the product', async () => {
      const productService = await app.resolve(ProductService);

      await productService.create({
        price: 2.99,
        name: 'Apple',
      });

      return request(app.getHttpServer())
        .post(gql)
        .send(ProductQueries.remove)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.removeProduct).toEqual({
            id: 1,
            price: 2.99,
            name: 'Apple',
          });
        });
    });
  });
});
