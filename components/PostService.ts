import getBaseUrl from "@/data/baseConfig";
import { Post } from "../app/(main)/share-types/post-schema";

class PostService {
  private posts: Post[] = [];
  private post : Post = {
    id: '',
    title: '',
    body: '',
    author: '',
    date: '' ,
    comments: []
  } ;

  private baseUrl: string = getBaseUrl();

  async fetchPosts(): Promise<Post[]> {
    console.error('calling retrieve posts:');
    try {
      //delay for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      this.posts = await response.json();
      return this.posts;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  }

  getPosts(): Post[] {
    return this.posts;
  }

  async fetchPostById(id:number): Promise<Post> {
    try {

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const url = `${this.baseUrl}/${id}`;
      console.debug('calling' + url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.post = await response.json();
      return this.post;
    } catch (error) {
      console.error(`Failed to fetch post with id ${id}:`, error);
      throw error;
    }
  }

  async persistPost(post: Post): Promise<Post> {
    const url = `${this.baseUrl}/${post.id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const createdPost = await response.json();
      return createdPost;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  }
  
}

export default new PostService();