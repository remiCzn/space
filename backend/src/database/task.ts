import {task as Task} from '@prisma/client';
import dbRepository, {AccessDatabaseError} from "./db";

export class TaskRepository extends dbRepository {
    public async findByUserId(userId: number): Promise<Array<Task>> {
        return this.db().task.findMany({
            where: {
                user: userId
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async addTask(userId: number, title: string): Promise<void> {
        await this.db().task.create({
            data: {
                user: userId,
                title: title
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        })
        return;
    }

    public async deleteTask(taskId: number): Promise<void> {
        await this.db().task.delete({
            where: {
                id: taskId
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async getTaskById(taskId: number): Promise<Task> {
        return this.db().task.findUnique({
            where: {
                id: taskId
            }
        }).then((task: Task | null) => {
            if (task === null) {
                throw new Error("This task doesn't exists");
            }
            return task;
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }
}
