import { StateCreator } from "zustand";
import { TStore } from "./index";
import {
  createTaskRequest,
  deleteAllDoneTasksRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";
import {
  type ITask,
  type TCreateTask,
  type TUpdateTask,
  type TResponse,
  NOTIFICATION_TYPE,
} from "../types";

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
  deleteAllDoneTasks: () => Promise<void>;
  updateTask: () => Promise<void>;
  updateTaskStatus: (id: string, task: TUpdateTask) => Promise<void>;
};

const defaultTaskData: TCreateTask = {
  title: "",
  description: "",
  done: false,
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
    get().showLoading();
    try {
      const response = await getTasksRequest();
      if (response.ok) {
        const data = (await response.json()) as ITask[];
        set(() => ({
          tasks: data,
        }));
      }
    } catch (error) {
      get().showMessage("Something went wrong", NOTIFICATION_TYPE.ERROR);
    } finally {
      get().dismissLoading();
    }
  },
  createTask: async () => {
    get().showLoading();
    try {
      const response = await createTaskRequest(get().task);
      if (response.ok) {
        void get().getAllTasks();
        get().clearTaskData();
        get().showMessage(
          "Task created successfully",
          NOTIFICATION_TYPE.SUCCESS
        );
      } else {
        const data = (await response.json()) as TResponse;
        get().handleErrorMessages(data.message);
      }
    } catch (error) {
      get().showMessage("Something went wrong", NOTIFICATION_TYPE.ERROR);
    } finally {
      get().dismissLoading();
    }
  },
  deleteTask: async (id: string) => {
    get().showLoading();
    try {
      const response = await deleteTaskRequest(id);
      if (response.ok) {
        void get().getAllTasks();
        get().showMessage(
          "Task deleted successfully",
          NOTIFICATION_TYPE.SUCCESS
        );
      }
    } catch (error) {
      get().showMessage("Something went wrong", NOTIFICATION_TYPE.ERROR);
    } finally {
      get().dismissLoading();
    }
  },
  deleteAllDoneTasks: async () => {
    get().showLoading();
    try {
      const response = await deleteAllDoneTasksRequest();
      if (response.ok) {
        void get().getAllTasks();
        get().showMessage(
          "Tasks deleted successfully",
          NOTIFICATION_TYPE.SUCCESS
        );
      }
    } catch (error) {
      get().showMessage("Something went wrong", NOTIFICATION_TYPE.ERROR);
    } finally {
      get().dismissLoading();
    }
  },
  updateTask: async () => {
    get().showLoading();
    try {
      const response = await updateTaskRequest(get().idEditingTask, get().task);
      if (response.ok) {
        void get().getAllTasks();
        get().clearTaskData();
        get().showMessage(
          "Task updated successfully",
          NOTIFICATION_TYPE.SUCCESS
        );
        set(() => ({
          task: defaultTaskData,
          idEditingTask: "",
        }));
      } else {
        const data = (await response.json()) as TResponse;
        get().handleErrorMessages(data.message);
      }
    } catch (error) {
      get().showMessage("Something went wrong", NOTIFICATION_TYPE.ERROR);
    } finally {
      get().dismissLoading();
    }
  },
  updateTaskStatus: async (id: string, task: TUpdateTask) => {
    get().showLoading();
    try {
      const response = await updateTaskRequest(id, task);
      if (response.ok) {
        void get().getAllTasks();
        get().showMessage(
          "Task updated successfully",
          NOTIFICATION_TYPE.SUCCESS
        );
      } else {
        const data = (await response.json()) as TResponse;
        get().handleErrorMessages(data.message);
      }
    } catch (error) {
      get().showMessage("Something went wrong", NOTIFICATION_TYPE.ERROR);
    } finally {
      get().dismissLoading();
    }
  },
  clearTaskData: () =>
    set(() => ({
      task: defaultTaskData,
      idEditingTask: "",
    })),
});

export default TaskSlice;
