import getBaseUrl from "@/data/baseConfig";
import axios from 'axios';
import { Post } from "../../share-types/post-schema";

const postUrl = '/posts';
const baseUrl = getBaseUrl() ;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export async function fetchPosts(): Promise<Post[]> {
  console.log('baseurl:', baseUrl);
  console.log('posturl:', postUrl);
  const response = await apiClient.get<Post[]>(postUrl);
  return response.data;
}

export async function fetchPost(id: number): Promise<Post> {
  const url = `${postUrl}/${id}`;
  const response = await apiClient.get<Post>(url);
  return response.data;
}

export async function createPost(post: Post): Promise<Post> {
  const response = await apiClient.post<Post>(postUrl, post);
  return response.data;
}

export async function updatePost(post: Post): Promise<Post> {
  const url = `${postUrl}/${post.id}`;
  const response = await apiClient.put<Post>(url, post);
  return response.data;

}

export async function deletePost(id: number): Promise<void> {
  const url = `${postUrl}/${id}`;
  await apiClient.delete(url);

}