import db from "../database";
import { Order } from "../interfaces/order.interface";

export class OrderStore {
  async getAllOrders(): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders";
      const { rows } = await conn.query(sql);
      conn.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async getOrderById(id: number): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders WHERE id = $1";
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`);
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const { rows } = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not add order. Error: ${err}`);
    }
  }

  async updateOrder(order: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        "UPDATE orders SET status = $1, user_id = $2 WHERE id = $3 RETURNING *";
      const { rows } = await conn.query(sql, [
        order.status,
        order.user_id,
        order.id,
      ]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not update order. Error: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM orders WHERE id = $1 RETURNING *";
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err}`);
    }
  }
}
