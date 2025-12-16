import apiClient from './client';
import type { Category, CreateCategoryRequest } from '@/types';

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  createCategory: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<Category>('/categories', data);
    return response.data;
  },

  updateCategory: async (id: string, data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.put<Category>(`/categories/${id}`, data);
    return response.data;
  },
};

