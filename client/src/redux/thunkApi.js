import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../utils/apiInstance";

export const getCategoryList = createAsyncThunk(
  "category/getList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get(`/category_list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post(`/add_category`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const viewCategory = createAsyncThunk(
  "category/view",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get(`/view_category/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiInstance.put(`/edit_category`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiInstance.delete(`/delete_category/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleCategoryStatus = createAsyncThunk(
  "category/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiInstance.put(`/toggleStatus/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserList = createAsyncThunk(
  "user/getList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get(`/user_list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post(`/add_user`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const viewUser = createAsyncThunk(
  "user/view",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get(`/view_user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/edit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiInstance.put(`/edit_user`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiInstance.delete(`/delete_user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  "user/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiInstance.put(`/toggleUserStatus/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
