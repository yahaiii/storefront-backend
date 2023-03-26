import { ProductStore } from '../models/product';
import { Pool } from 'pg';
import { Product } from '../interfaces/product.interface';

const pool = new Pool();

describe("ProductStore", () => {

  const productStore = new ProductStore();

  beforeAll(() => {
    pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )
    `);
  });

  afterAll(() => {
    pool.query(`
      DROP TABLE products
    `);
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const newProduct = await productStore.createProduct({id: 1, name: "test product", price: 20});
      expect(newProduct.name).toEqual("test product");
      expect(newProduct.price).toEqual(20);
    });
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const products = await productStore.getAllProducts();
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe("getProductById", () => {
    it("should return the specified product", async () => {
        const newProduct = await productStore.createProduct({id: 2, name: "test product", price: 20}) as Product;
        const product = await productStore.getProductById(newProduct.id as number);        
      expect(product.name).toEqual("test product");
      expect(product.price).toEqual(20);
    });
  });

  describe("updateProduct", () => {
    it("should update the specified product", async () => {
      const newProduct = await productStore.createProduct({id: 3, name: "test product", price: 20});
      const updatedProduct = await productStore.updateProduct({...newProduct, price: 30});
      expect(updatedProduct.name).toEqual("test product");
      expect(updatedProduct.price).toEqual(30);
    });
  });

  describe("deleteProduct", () => {
    it("should delete the specified product", async () => {
      const newProduct = await productStore.createProduct({id: 4, name: "test product", price: 20});
      await productStore.deleteProduct(newProduct.id as number);
      const product = await productStore.getProductById(newProduct.id as number);
      expect(product).toBeUndefined();
    });
  });
});
