import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoriesReducer from './slices/categoriesSlice';
import postsReducer from './slices/postsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    posts: postsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

