import { FOLDER } from "../models/folder.db";
import pool from "./db";

export default {
  getFolderById: async (id: number) => {
    const db = await pool.getConnection();
    return await db
      .query("SELECT * FROM SPACE.FOLDER WHERE ID = ?", [id])
      .then((result: Array<FOLDER>) => {
        return result[0];
      });
  },
  getFolderByUser: async (userId: number) => {
    const db = await pool.getConnection();
    const folderList = await db
      .query("SELECT * FROM SPACE.FOLDER WHERE USER = ?", [userId])
      .then((result): Array<any> => {
        return result.slice(0, result.length);
      });
    return folderList;
  },
  getHomeFolder: async (userid: number) => {
    const db = await pool.getConnection();
    const home = await db
      .query("SELECT * FROM SPACE.FOLDER WHERE parent IS NULL AND user = ?", [
        userid,
      ])
      .then((res) => {
        if (res.length >= 1) {
          return res[0];
        } else {
          return db
            .query("INSERT INTO SPACE.FOLDER(title, user) VALUES (?,?)", [
              "Home",
              userid,
            ])
            .then(() => {
              return db
                .query("SELECT * FROM SPACE.FOLDER WHERE PARENT = NULL")
                .then(async (folder) => {
                  return folder[0];
                });
            });
        }
      });
    return home;
  },
  delete: async (id: number) => {
    const db = await pool.getConnection();
    await db.query("DELETE FROM SPACE.FOLDER WHERE ID = ?", [id]);
  },
  createFolder: async (user: number, title: string, parent: number) => {
    const db = await pool.getConnection();
    return await db.query(
      "INSERT INTO SPACE.FOLDER(user, title, parent) VALUES (?,?,?)",
      [user, title, parent]
    );
  },
};
