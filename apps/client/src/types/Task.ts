export interface ITask {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TCreateTask = Omit<ITask, "_id" | "createdAt" | "updatedAt">;

export type TUpdateTask = Partial<TCreateTask>;
