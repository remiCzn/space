import mariadb from "mariadb";
import env from "../../env";

export default class dbRepository {
  private pool: mariadb.Pool = mariadb.createPool({
    host: env.DB_URL,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    connectionLimit: 5,
    database: "SPACE",
  });

  private db() {
    return this.pool.getConnection();
  }

  protected async query(sql: string, values?: any): Promise<any> {
    const db = await this.db();
    return db.query(sql, values).then((res) => {
      db.end();
      return res;
    });
  }

  public async testConnection(): Promise<void> {
    return this.query("SELECT 1 AS VALUE")
      .then(() => {
        console.log("MariaDB successfully connected.");
      })
      .catch(() => {
        console.log("Failed to connect to MariaDB");
        process.exit();
      });
  }
}
