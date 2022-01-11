import dbRepository from "./db";

export class FileRepository extends dbRepository {
  public async addFile(name: string, path: string): Promise<any> {
    return this.query("INSERT INTO FILE(name, path) VALUES(?,?)", [
      name,
      path,
    ]).then((res) => {
      return res.insertId;
    });
  }
}
