import apiClient from './client';
import type { Post, PostShort, CreatePostRequest } from '@/types';

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  },

  getPostsShort: async (): Promise<PostShort[]> => {
    const response = await apiClient.get<PostShort[]>('/posts/short');
    return response.data;
  },

  getPostById: async (id: string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post<Post>('/posts', data);
    return response.data;
  },

  updatePost: async (id: string, data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};

