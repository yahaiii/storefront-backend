import db from "../database";
import { User } from "../interfaces/user.interface";

export class UserStore {

    async getAllUsers(): Promise<User[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users';
            const { rows } = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await conn.query(sql, [id]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Could not get user. Error: ${err}`);
        }
    }

    async createUser(user: User): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';
            const { rows } = await conn.query(sql, [user.firstName, user.lastName, user.password]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Could not add user. Error: ${err}`);
        }
    }

    async updateUser(user: User): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE users SET firstName = $1, lastName = $2, password = $3 WHERE id = $4 RETURNING *';
            const { rows } = await conn.query(sql, [user.firstName, user.lastName, user.password, user.id]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error (`Could not update user. Error ${err}`);
        }
    }

    async deleteUser(id: number): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
            const { rows } = await conn.query(sql, [id]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error (`Could not delete user. Error: ${err}`);
        }
    }
}
