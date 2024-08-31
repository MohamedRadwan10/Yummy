import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { Categories: [], loading: false, isError: null };

export let getCategories = createAsyncThunk(
  "categoriesSlice/getcategories",
  async () => {
    const {data} = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    return data.categories;
  }
);

let CategoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.Categories = payload;
      state.loading = false;
    });

    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.loading = false;
      state.isError = payload;
    });
  },
});

export let CategoriesReducer = CategoriesSlice.reducer;