import pool from "./db";

export default {
    getFolderById: async (id: number) => {
        const db = await pool.getConnection();
        const folder = await db.query("SELECT * FROM SPACE.FOLDER WHERE ID = ?", [id]).then((result) => {
            return result[0];
        })
    },
    getFolderByUser: async (userId: number) => {
        const db = await pool.getConnection();
        const folderList = await db.query("SELECT * FROM SPACE.FOLDER WHERE USER = ?", [userId]).then((result): Array<any> => {
            return result.slice(0, result.length);
        })
        return folderList;
    },
    getHomeFolder: async (userid: number) => {

    }
}