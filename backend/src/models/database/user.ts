import pool from "./db"

export default {
    getUserById: async (userId: number) => {
        const db = await pool.getConnection();
        return db.query("SELECT * FROM SPACE.USER WHERE ID = ?", [userId]).then((res) => {
            if (res.length >= 1) {
                return res[0];
            }
        })
    }
}
