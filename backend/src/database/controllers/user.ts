import { USER } from "../../database/models/user.db";
import pool from "./db";

export default {
  getUserById: async (userId: number): Promise<USER> => {
    const db = await pool.getConnection();
    return db
      .query("SELECT * FROM SPACE.USER WHERE ID = ?", [userId])
      .then((res) => {
        if (res.length >= 1) {
          return res[0];
        }
      });
  },
  getUserByEmail: async (userEmail: string): Promise<Array<USER>> => {
    const db = await pool.getConnection();
    return db
      .query("SELECT * FROM SPACE.USER WHERE EMAIL = ?", [userEmail])
      .then((res: Array<any>) => {
        return res.splice(0, res.length - 1);
      });
  },
  createUser: async (
    email: string,
    password: string,
    username: string
  ): Promise<void> => {
    const db = await pool.getConnection();
    return db.query(
      "INSERT INTO SPACE.USER(email, password, username) VALUES (?,?,?)",
      [email, password, username]
    );
  },
  changeUsername: async (userId: number, username: string): Promise<void> => {
    const db = await pool.getConnection();
    return db.query("UPDATE SPACE.USER SET username = ? WHERE id = ?", [
      username,
      userId,
    ]);
  },
};
