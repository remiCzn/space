import { FOLDER } from "../models/folder.db";
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

  public async deleteTask(taskId: number) {
    return this.query("DELETE FROM TASK WHERE id = ?", [taskId]);
  }

  public async getTaskById(taskId: number) {
    return this.query("SELECT * FROM TASK WHERE id = ?", [taskId]).then(
      (res: FOLDER[]) => {
        console.log(res);
        if (res.length > 0) {
          return res[0];
        }
      }
    );
  }
}
