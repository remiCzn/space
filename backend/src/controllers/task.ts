import {task as Task} from "@prisma/client";
import {TaskRepository} from "../database/task";
import {CreateTask, GetTaskList} from "../models/tasks.api";
import {ApiRequest, ApiResponse} from "../utils/expressUtils";

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
        const tasks: Task[] = await this.taskRepo.findByUserId(userId);
        const taskResult: GetTaskList = {
            list: tasks.map((task: Task) => {
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
                list: (await this.taskRepo.findByUserId(userId)).map((task: Task) => {
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
            const task: Task = await this.taskRepo.getTaskById(taskId);
            if (task == undefined) {
                return res.sendStatus(404);
            }
            if (task.userId != req.user?.userId || req.user?.userId == undefined) {
                return res.sendStatus(403);
            }

            await this.taskRepo.deleteTask(taskId);
            const taskList: GetTaskList = {
                list: (await this.taskRepo.findByUserId(req.user?.userId)).map(
                    (task: Task) => {
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
