import { TaskRepository } from "../database/controllers/task";
import { TASK } from "../database/models/task.db";
import { CreateTask, GetTaskList } from "../models/tasks.api";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export class TaskBusinessController {
  private taskRepo: TaskRepository;

  public constructor() {
    this.taskRepo = new TaskRepository();

    this.getTasks = this.getTasks.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  public async getTasks(req: ApiRequest<any>, res: ApiResponse<GetTaskList>) {
    const userId: number | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }
    const tasks: TASK[] = await this.taskRepo.findByUserId(userId);
    const taskResult: GetTaskList = {
      list: tasks.map((task: TASK) => {
        return task.title;
      }),
    };
    return res.status(200).send(taskResult);
  }

  public async createTask(
    req: ApiRequest<CreateTask>,
    res: ApiResponse<{ message: string }>
  ) {
    const userId: number | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }

    return this.taskRepo.addTask(userId, req.body.name).then(() => {
      return res.sendStatus(200);
    });
  }
}
