import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { Ingredient: [], loading: false, isError: null };

export let getIngredient = createAsyncThunk(
  "ingredientSlice/getIngredient",
  async () => {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=`
    );
    return data.meals.slice(0, 24);
  }
);

let IngredientSlice = createSlice({
  name: "ingredientSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getIngredient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIngredient.fulfilled, (state, { payload }) => {
      state.Ingredient = payload;
      state.loading = false;
    });

    builder.addCase(getIngredient.rejected, (state, { payload }) => {
      state.loading = false;
      state.isError = payload;
    });
  },
});

export let IngredientReducer = IngredientSlice.reducer;
