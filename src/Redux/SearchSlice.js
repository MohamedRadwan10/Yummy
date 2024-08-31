import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  Search: [],
  SearchByName: [],
  loading: false,
  isError: null,
};

export let getSearch = createAsyncThunk(
  "SearchSlice/getSearch",
  async (name) => {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    return data.meals;
  }
);

export let getSearchByName = createAsyncThunk(
  "searchNameSlice/getNameSearch",
  async (name) => {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
    );
    return data.meals;
  }
);

let SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  extraReducers: (builder) => {
    // Handling getSearch actions
    builder.addCase(getSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSearch.fulfilled, (state, { payload }) => {
      state.Search = payload;
      state.loading = false;
    });
    builder.addCase(getSearch.rejected, (state, { error }) => {
      state.loading = false;
      state.isError = error.message; // Use error.message for better error handling
    });

    // Handling getSearchByName actions
    builder.addCase(getSearchByName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSearchByName.fulfilled, (state, { payload }) => {
      state.SearchByName = payload;
      state.loading = false;
    });
    builder.addCase(getSearchByName.rejected, (state, { error }) => {
      state.loading = false;
      state.isError = error.message; // Use error.message for better error handling
    });
  },
});

export let SearchReducer = SearchSlice.reducer;


