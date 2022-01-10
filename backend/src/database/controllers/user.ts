import { USER } from "../../database/models/user.db";
import dbRepository from "./db";

export class UserRepository extends dbRepository {
  public async getUserById(userId: number): Promise<USER> {
    return this.query("SELECT * FROM USER WHERE ID = ?", [userId]).then(
      (res) => {
        if (res.length >= 1) {
          return res[0];
        } else {
          Promise.reject();
        }
      }
    );
  }

  public async getUserByEmail(userEmail: string): Promise<Array<USER>> {
    return this.query("SELECT * FROM USER WHERE email = ?", [userEmail]).then(
      (res: Array<any>) => {
        return res.splice(0, res.length);
      }
    );
  }

  public async createUser(
    email: string,
    password: string,
    username: string
  ): Promise<void> {
    return this.query(
      "INSERT INTO USER(email, password, username) VALUES (?,?,?)",
      [email, password, username]
    );
  }

  public async changeUsername(userId: number, username: string): Promise<void> {
    return this.query("UPDATE USER SET username = ? WHERE id = ?", [
      username,
      userId,
    ]);
  }
}
