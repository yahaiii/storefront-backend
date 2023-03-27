import db from "../database";
import { Product } from "../interfaces/product.interface";

export class ProductStore {

    async getAllProducts(): Promise<Product[]> {
        try {

            const conn = await db.connect();
            const sql = 'SELECT * FROM products';

            const { rows } = await conn.query(sql);

            conn.release();

            return rows;

        } catch (err) {

            throw new Error(`Could not get products. Error: ${err}`);

        }
      
    }


    async getProductById(id: number): Promise<Product> {

        try {
            
            const conn = await db.connect();

            const sql = 'SELECT * FROM products WHERE id = $1';
            const { rows } = await conn.query(sql, [id]);

            conn.release();

            return rows[0];

        } catch (err) {

            throw new Error(`Could not get product. Error: ${err}`);

        }
    }

    async createProduct(product: Product): Promise<Product> {
        
        try {
            const conn = await db.connect();

            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const { rows } = await conn.query(sql, [product.name, product.price]);

            conn.release();

            return rows[0];

        } catch (err) {
            
            throw new Error(`Could not add product. Error: ${err}`);

        }
    }

}
