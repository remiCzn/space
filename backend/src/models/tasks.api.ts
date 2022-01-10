export interface GetTaskList {
  list: Array<{
    title: string;
    id: number;
  }>;
}

export interface CreateTask {
  name: string;
}
