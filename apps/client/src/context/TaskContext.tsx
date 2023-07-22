import { FC, ReactNode, createContext, useEffect, useState } from "react";
// import { ITask } from "../interfaces/task.interface";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";
import { ITask, TCreateTask, TUpdateTask } from "../interfaces/task.interface";

interface TaskContextValue {
  tasks: ITask[];
  createTask: (task: TCreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: TUpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => Promise.resolve(),
  deleteTask: async () => Promise.resolve(),
  updateTask: async () => Promise.resolve(),
});

interface IProps {
  children: ReactNode;
}

export const TaskProvider: FC<IProps> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    getTasks().catch((error) => console.log(error));
  }, []);

  const getTasks = async () => {
    const response = await getTasksRequest();
    const data = (await response.json()) as ITask[];
    setTasks(data);
    // console.log(data);
  };

  const createTask = async (task: TCreateTask): Promise<void> => {
    const response = await createTaskRequest(task);
    const newTask = (await response.json()) as ITask;
    setTasks([...tasks, newTask]);
    // console.log(data, response.ok);
    // if (response.ok) {
    //   handleClear();
    // }
  };

  const deleteTask = async (id: string) => {
    const response = await deleteTaskRequest(id);
    console.log(response);
    if (response.ok)
      setTasks((tasks) => tasks.filter((task) => task._id !== id));
  };

  const updateTask = async (id: string, task: TUpdateTask) => {
    const response = await updateTaskRequest(id, task);
    const data = (await response.json()) as ITask;
    setTasks((tasks) =>
      tasks.map((task) => (task._id === id ? { ...data } : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
