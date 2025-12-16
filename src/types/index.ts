// User types
export interface User {
  id: string;
  username: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserAuth {
  id: string;
  username: string;
  role?: string[];
  roles?: string[];
  token: string;
}

// Post types
export interface Post {
  id: string;
  _id?: string;
  title: string;
  text: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostShort {
  id: string;
  _id?: string;
  title: string;
  category: string;
}

// Category types
export interface Category {
  id: string;
  _id?: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// Request types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegistrationRequest {
  username: string;
  password: string;
}

export interface CreatePostRequest {
  title: string;
  text: string;
  category: string;
}

export interface CreateCategoryRequest {
  title: string;
}

// Response types
export interface AuthResponse {
  id: string;
  username: string;
  role?: string[];
  roles?: string[];
  token: string;
}

export interface ErrorResponse {
  errorsMessages?: Array<{
    message: string;
    field: string;
  }>;
  message?: string;
}

export interface SuccessMessage {
  message: string;
}

