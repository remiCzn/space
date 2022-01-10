import { TaskRepository } from "../database/controllers/task";
import { FOLDER } from "../database/models/folder.db";
import { TASK } from "../database/models/task.db";
import { CreateTask, GetTaskList } from "../models/tasks.api";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export class TaskBusinessController {
  private taskRepo: TaskRepository;

  public constructor() {
    this.taskRepo = new TaskRepository();

    this.getTasks = this.getTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  public async getTasks(req: ApiRequest<any>, res: ApiResponse<GetTaskList>) {
    const userId: number | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }
    const tasks: TASK[] = await this.taskRepo.findByUserId(userId);
    const taskResult: GetTaskList = {
      list: tasks.map((task: TASK) => {
        return {
          id: task.id,
          title: task.title,
        };
      }),
    };
    return res.status(200).send(taskResult);
  }

  public async createTask(
    req: ApiRequest<CreateTask>,
    res: ApiResponse<GetTaskList>
  ) {
    const userId: number | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }

    return this.taskRepo.addTask(userId, req.body.name).then(async () => {
      const taskList: GetTaskList = {
        list: (await this.taskRepo.findByUserId(userId)).map((task: TASK) => {
          return {
            title: task.title,
            id: task.id,
          };
        }),
      };
      return res.status(200).json(taskList);
    });
  }

  public async deleteTask(req: ApiRequest<any>, res: ApiResponse<GetTaskList>) {
    try {
      const taskId: number = parseInt(req.params.id);
      console.log(1);
      const task: FOLDER | undefined = await this.taskRepo.getTaskById(taskId);
      console.log(2);
      if (task == undefined) {
        return res.sendStatus(404);
      }
      console.log(3);
      if (task.user != req.user?.userId || req.user?.userId == undefined) {
        return res.sendStatus(403);
      }

      await this.taskRepo.deleteTask(taskId);
      const taskList: GetTaskList = {
        list: (await this.taskRepo.findByUserId(req.user?.userId)).map(
          (task: TASK) => {
            return {
              title: task.title,
              id: task.id,
            };
          }
        ),
      };
      return res.status(200).json(taskList);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}
