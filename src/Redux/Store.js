import { AreaReducer } from "./AreaSlice";
import { CategoriesReducer } from "./CategoriesSlice";
import { DetailsReducer } from "./DetailsSlice";
import { homeReducer } from "./HomeSLice";
import { configureStore } from "@reduxjs/toolkit";
import { IngredientReducer } from "./IngredientSlice";
import { CategoriesDetailsReducer } from "./CategoriesDetailsSlice";
import { AreaDetailsReducer } from "./AreaDetailsSlice";
import { IngredientDetailsReducer } from "./IngredientDetails";
import { SearchReducer } from "./SearchSlice";

export let store = configureStore({
  reducer: {
    Home: homeReducer,
    Categories: CategoriesReducer,
    Details: DetailsReducer,
    Area: AreaReducer,
    Ingredient: IngredientReducer,
    CategoriesDetails: CategoriesDetailsReducer,
    AreaDetails: AreaDetailsReducer,
    IngredientDetails: IngredientDetailsReducer,
    Search: SearchReducer,
  },
});
