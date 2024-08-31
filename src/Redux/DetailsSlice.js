import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { Details: [], loading: false, isError: null };

export let getDetails = createAsyncThunk("detailsSlice/getDetails", async (id) => {
  let { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return data.meals[0];
});

let DetailsSlice = createSlice({
  name: "detailsSlice",
  initialState,
  extraReducers: (bilder) => {
    bilder.addCase(getDetails.fulfilled, (state, { payload }) => {
      state.Details = payload;
      state.loading = false;
    });
    bilder.addCase(getDetails.pending, (state) => {
      state.loading = true;
    });
    bilder.addCase(getDetails.rejected, (state, { payload }) => {
      state.isError = payload;
      state.loading = false;
    });
  },
});

export let DetailsReducer = DetailsSlice.reducer;
