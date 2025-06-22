import getBaseUrl from "@/data/baseConfig";
import axios from "axios";
import { Task } from "../data/schema";
import { use } from 'react'

const postUrl = '/tasks';
const baseUrl = getBaseUrl() ;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export async function fetchTasksAction(): Promise<Task[]> {
  //delay for 2 seconds
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await apiClient.get<Task[]>(postUrl);
  console.log('fetchTasksAction');
  return response.data;
}

export async function createTaskAction(task: Task): Promise<Task> {
  const response = await apiClient.post<Task>(postUrl, task);
  return response.data;
}

export async function updateTaskAction(task: Task): Promise<Task> {
  const url = `${postUrl}/${task.id}`;
  const response = await apiClient.put<Task>(url, task);
  return response.data;
}

export async function deleteTaskAction(id: string): Promise<void> {
  const url = `${postUrl}/${id}`;
  await apiClient.delete(url);
}

//update task
