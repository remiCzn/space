import { CreateTask, GetTaskList } from "../models/api/tasks.api";
import Task from "../models/database/task.model";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export default {
  getTasks: async (req: ApiRequest<any>, res: ApiResponse<GetTaskList>) => {
    const userId: string | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }
    const tasks: typeof Task[] = await Task.find({ user: userId });
    const taskResult: GetTaskList = {
      list: tasks.map((task: typeof Task) => {
        return task.title;
      }),
    };
    return res.status(200).send(taskResult);
  },
  createTask: async (
    req: ApiRequest<CreateTask>,
    res: ApiResponse<{ message: string }>
  ) => {
    const userId: string | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }
    const task = new Task({ title: req.body.name, user: userId });
    return task.save().then((newtask: any) => {
      console.log(newtask);
      return res.status(200).json({ message: "ok" });
    });
  },
};
