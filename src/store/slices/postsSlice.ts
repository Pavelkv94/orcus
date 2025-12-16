import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postsApi } from '@/api/posts';
import type { Post, PostShort, CreatePostRequest } from '@/types';

interface PostsState {
  posts: Post[];
  postsShort: PostShort[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  postsShort: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await postsApi.getPosts();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPostsShort = createAsyncThunk(
  'posts/fetchShort',
  async (_, { rejectWithValue }) => {
    try {
      return await postsApi.getPostsShort();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await postsApi.getPostById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/create',
  async (data: CreatePostRequest, { rejectWithValue }) => {
    try {
      return await postsApi.createPost(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, data }: { id: string; data: CreatePostRequest }, { rejectWithValue }) => {
    try {
      return await postsApi.updatePost(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await postsApi.deletePost(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch short posts
      .addCase(fetchPostsShort.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsShort.fulfilled, (state, action) => {
        state.loading = false;
        state.postsShort = action.payload;
      })
      .addCase(fetchPostsShort.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
        state.postsShort.push({
          id: action.payload.id,
          _id: action.payload._id,
          title: action.payload.title,
          category: action.payload.category,
        });
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id || post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        const shortIndex = state.postsShort.findIndex(
          (post) => post.id === action.payload.id || post._id === action.payload._id
        );
        if (shortIndex !== -1) {
          state.postsShort[shortIndex] = {
            id: action.payload.id,
            _id: action.payload._id,
            title: action.payload.title,
            category: action.payload.category,
          };
        }
        if (state.currentPost && (state.currentPost.id === action.payload.id || state.currentPost._id === action.payload._id)) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload && post._id !== action.payload
        );
        state.postsShort = state.postsShort.filter(
          (post) => post.id !== action.payload && post._id !== action.payload
        );
        if (state.currentPost && (state.currentPost.id === action.payload || state.currentPost._id === action.payload)) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPost, clearError } = postsSlice.actions;
export default postsSlice.reducer;

