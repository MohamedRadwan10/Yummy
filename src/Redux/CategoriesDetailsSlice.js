import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { CategoriesDetails: [], loading: false, isError: null };

export let getCategoriesDetails = createAsyncThunk(
  "categoriesDetailsSlice/getcategoriesDetails",
  async (name) => {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    );
    return data.meals;
  }
);

let CategoriesDetailsSlice = createSlice({
  name: "categoriesDetailsSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategoriesDetails.pending, (state) => {
      state.loading = true;
      state.isError = null;
    });
    builder.addCase(getCategoriesDetails.fulfilled, (state, { payload }) => {
      state.CategoriesDetails = payload;
      state.loading = false;
    });

    builder.addCase(getCategoriesDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.isError = payload;
    });
  },
});

export let CategoriesDetailsReducer = CategoriesDetailsSlice.reducer;
