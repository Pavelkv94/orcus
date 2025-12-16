import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { categoriesApi } from '@/api/categories';
import type { Category, CreateCategoryRequest } from '@/types';

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await categoriesApi.getCategories();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (data: CreateCategoryRequest, { rejectWithValue }) => {
    try {
      return await categoriesApi.createCategory(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, data }: { id: string; data: CreateCategoryRequest }, { rejectWithValue }) => {
    try {
      return await categoriesApi.updateCategory(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id || cat._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;

