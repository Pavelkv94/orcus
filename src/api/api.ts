import axios from "axios";
import { CredentialsType } from "../components/Login/Login";

const expandHeaders = async () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const baseUrl = (url: string) => `${import.meta.env.VITE_SERVER_URL}${url}`;

const axiosInstance = axios.create(); // Create an Axios instance

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if ((error.response && error.response.status === 403) || (error.response && error.response.status === 401)) {
      console.error("Access denied: You do not have permission to perform this action.");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login"; // Redirect to unauthorized page
    }
    return Promise.reject(error); // Reject the promise so that it can be handled downstream
  }
);

const newAPI = {
  get: (url: string, headers: object = {}, params: object = {}) => {
    return axiosInstance.get(url, {
      headers,
      params,
    });
  },
  put(url: string, headers = {}, data = {}) {
    return axiosInstance.put(url, data, {
      headers,
    });
  },
  post(url: string, headers = {}, data = {}) {
    return axiosInstance.post(url, data, {
      headers,
    });
  },
  delete(url: string, headers = {}) {
    return axiosInstance.delete(url, {
      headers,
    });
  },
};

export const API = {
  async createCategory(title: string) {
    return newAPI.post(baseUrl("/categories"), await expandHeaders(), {
      title: title,
    });
  },
  async getCategories() {
    return newAPI.get(baseUrl("/categories"), await expandHeaders());
  },
  async createPost(title: string, category: string, text: string) {
    return newAPI.post(baseUrl("/posts"), await expandHeaders(), {
      title,
      category,
      text,
    });
  },
  async editPost(title: string, category: string, text: string, id: string) {
    return newAPI.put(baseUrl(`/posts/${id}`), await expandHeaders(), {
      title,
      category,
      text,
    });
  },
  async deletePost(id: string) {
    return newAPI.delete(baseUrl(`/posts/${id}`), await expandHeaders());
  },
  async getPosts() {
    return newAPI.get(baseUrl("/posts"), await expandHeaders());
  },
  async getShortPosts() {
    return newAPI.get(baseUrl("/posts/short"), await expandHeaders());
  },
  async getPost(id: string) {
    return newAPI.get(baseUrl(`/posts/${id}`), await expandHeaders());
  },
  async addPostToCategory(post: string, category: string) {
    return newAPI.put(baseUrl("/categories"), await expandHeaders(), {
      newPost: post,
      category,
    });
  },
  async login(payload: object) {
    return newAPI.post(baseUrl("/auth/login"), {}, payload);
  },
  async registration(payload: CredentialsType) {
    return newAPI.post(baseUrl("/auth/registration"), {}, payload);
  },
  async me(username: string | null) {
    return newAPI.get(baseUrl(`/auth/me/${username}`), await expandHeaders());
  },
};
