import getBaseUrl from "@/data/baseConfig";
import { Post } from "../app/(main)/share-types/post-schema";
import axios from 'axios';


const postUrl = '/posts';
const baseUrl = getBaseUrl() ;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export async function fetchPosts(): Promise<Post[]> {
  //delay for 2 seconds
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  //console.log('delay 2 seconds');
  const response = await apiClient.get<Post[]>(postUrl);
  return response.data;
}

export async function fetchPost(id: number): Promise<Post> {
  const url = `${postUrl}/${id}`;
  const response = await apiClient.get<Post>(url);
  return response.data;
}

export async function createPost(post: Post): Promise<Post> {
  //get the total number of posts in the database
  const posts = await fetchPosts();
  const maxId = posts.length > 0 ? Math.max(...posts.map(p => Number(p.id))) : 0;
  //set the id of the new post
  post.id = (maxId + 1).toString();
  console.log('Data created:', post);
  const url = `${postUrl}/${post.id}`;
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