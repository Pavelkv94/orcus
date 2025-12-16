import apiClient from './client';
import type { LoginRequest, RegistrationRequest, AuthResponse, SuccessMessage, User } from '@/types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegistrationRequest): Promise<SuccessMessage> => {
    const response = await apiClient.post<SuccessMessage>('/auth/registration', data);
    return response.data;
  },

  getUserProfile: async (username: string): Promise<{ username: string; roles: string[] }> => {
    const response = await apiClient.get<{ username: string; roles: string[] }>(`/auth/me/${username}`);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/auth/users');
    return response.data;
  },
};

