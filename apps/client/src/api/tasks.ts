import { TCreateTask, TUpdateTask } from "../interfaces/task.interface";

const API_URL = "/api/v1.0/";

export const createTaskRequest = (task: TCreateTask) =>
  fetch(`${API_URL}tasks`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getTasksRequest = () => fetch(`${API_URL}tasks`);

export const deleteTaskRequest = (id: string) =>
  fetch(`${API_URL}tasks/${id}`, {
    method: "DELETE",
  });

export const updateTaskRequest = (id: string, task: TUpdateTask) =>
  fetch(`${API_URL}tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
