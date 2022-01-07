import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "remi",
  password: "remi",
  port: 3306,
  connectionLimit: 5,
});

export default {
  getConnection(): Promise<mariadb.PoolConnection> {
    return pool.getConnection();
  },
};
