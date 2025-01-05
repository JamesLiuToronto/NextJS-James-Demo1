import getBaseUrl from "@/data/baseConfig";
import axios from "axios";
import { Task } from "../data/schema";

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