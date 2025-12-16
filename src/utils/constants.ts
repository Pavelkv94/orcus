export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  ADMIN: '/admin',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
} as const;

