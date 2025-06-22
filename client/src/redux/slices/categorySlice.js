import { createSlice } from "@reduxjs/toolkit";
import {
  getCategoryList,
  addCategory,
  viewCategory,
  editCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../thunkApi";

const initialState = {
  category_list: [],
  category_details: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // List
      .addCase(getCategoryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.category_list = action.payload.categories || [];
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // View
      .addCase(viewCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category_details = action.payload.category_details;
      })
      .addCase(viewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category_list.push(action.payload.new_category);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category_list = state.category_list.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle
      .addCase(toggleCategoryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const toggledId = action.meta.arg;
        const category = state.category_list.find((u) => u.id === toggledId);
        if (category) {
          category.status = category.status === 0 ? 1 : 0;
        }
      })
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
