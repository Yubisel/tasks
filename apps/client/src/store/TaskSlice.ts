import { StateCreator } from "zustand";
import { TStore } from "./index";
import { ITask, TCreateTask } from "../interfaces/task.interface";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";
import { NOTIFICATION_TYPE } from "./NotificationSlice";

export type TTask = {
  task: TCreateTask;
  tasks: ITask[];
  idEditingTask: string;
  setEditingTask: (id: string, task: TCreateTask) => void;
  clearTaskData: () => void;
  getAllTasks: () => Promise<void>;
  setTaskProp: (property: string, value: string) => void;
  createTask: () => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: () => Promise<void>;
};

const defaultTaskData: TCreateTask = {
  title: "",
  description: "",
};

const TaskSlice: StateCreator<TStore, [], [], TTask> = (set, get) => ({
  task: defaultTaskData,
  tasks: [],
  idEditingTask: "",
  setEditingTask: (id, task) =>
    set(() => ({
      idEditingTask: id,
      task,
    })),
  setTaskProp: (property: string, value: string) =>
    set((store) => ({
      task: {
        ...store.task,
        [property]: value,
      },
    })),
  getAllTasks: async () => {
    const response = await getTasksRequest();
    if (response.ok) {
      const data = (await response.json()) as ITask[];
      set(() => ({
        tasks: data,
      }));
    }
  },
  createTask: async () => {
    const response = await createTaskRequest(get().task);
    if (response.ok) {
      void get().getAllTasks();
      get().clearTaskData();
      get().showMessage("Task created successfully", NOTIFICATION_TYPE.SUCCESS);
    }
  },
  deleteTask: async (id: string) => {
    const response = await deleteTaskRequest(id);
    if (response.ok) {
      void get().getAllTasks();
      get().showMessage("Task deleted successfully", NOTIFICATION_TYPE.SUCCESS);
    }
  },
  updateTask: async () => {
    const response = await updateTaskRequest(get().idEditingTask, get().task);
    if (response.ok) {
      void get().getAllTasks();
      get().clearTaskData();
      get().showMessage("Task updated successfully", NOTIFICATION_TYPE.SUCCESS);
      set(() => ({
        task: defaultTaskData,
        idEditingTask: "",
      }));
    }
  },
  clearTaskData: () =>
    set(() => ({
      task: defaultTaskData,
      idEditingTask: "",
    })),
});

export default TaskSlice;
