import { TASK } from "../models/task.db";
import dbRepository from "./db";

export class TaskRepository extends dbRepository {
  public async findByUserId(userId: number): Promise<TASK[]> {
    return this.query("SELECT * FROM TASK WHERE user = ?", userId);
  }

  public async addTask(userId: number, title: string) {
    await this.query("INSERT INTO TASK(user, title) VALUES (?,?)", [
      userId,
      title,
    ]);
    return;
  }
}
