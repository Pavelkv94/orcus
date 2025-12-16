import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserAuth } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

interface AuthState {
  user: UserAuth | null;
  token: string | null;
  isAuthenticated: boolean;
}

const getStoredAuth = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      return { token, user };
    } catch {
      return { token: null, user: null };
    }
  }
  
  return { token: null, user: null };
};

const storedAuth = getStoredAuth();

const initialState: AuthState = {
  user: storedAuth.user,
  token: storedAuth.token,
  isAuthenticated: !!storedAuth.token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserAuth & { token: string }>) => {
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        roles: action.payload.roles || action.payload.role || [],
        token: action.payload.token,
      };
      state.token = action.payload.token;
      state.isAuthenticated = true;
      
      localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAdmin = (state: { auth: AuthState }) => {
  const roles = state.auth.user?.roles || [];
  return roles.includes('Admin');
};

export default authSlice.reducer;

