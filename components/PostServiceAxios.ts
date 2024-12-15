import { Post } from "../app/(main)/share-types/post-schema";
import axios from 'axios';

class PostServiceAxios {
  private posts: Post[] = [];
  private baseUrl: string = 'http://localhost:3001/posts';

  async fetchPosts(): Promise<Post[]> {
    return (await axios.get<Post[]>(this.baseUrl)).data ;
  }
  

  getPosts(): Post[] {
    return this.posts;
  }

  async fetchPost(id:number): Promise<Post> {
    const url = `${this.baseUrl}/${id}`;
    return (await axios.get<Post>(url)).data;
  }

  async createPost(post: Post): Promise<Post> {
    const url = `${this.baseUrl}`;
    return (await axios.post<Post>(url, post)).data;
  }

  async updatePost(post: Post): Promise<Post> {
    const url = `${this.baseUrl}/${post.id}`;
    return (await axios.put<Post>(url, post)).data;
  }

  async deletePost(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    return axios.delete(url);
  }
  
}

export default new PostServiceAxios();