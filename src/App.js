import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { Home } from "./Components/Home/Home";
import { NotFound } from "./Components/NotFound/NotFound";
import { Categories } from "./Components/Categories/Categories";
import { CategoriesDetails } from "./Components/CategoriesDetails/CategoriesDetails";
import { Area } from "./Components/Area/Area";
import { AreaDetails } from "./Components/AreaDetails/AreaDetails";
import { Ingredient } from "./Components/Ingredient/Ingredient";
import { IngredientDetails } from "./Components/IngredientDetails/IngredientDetails";
import { Details } from "./Components/Details/Details";
import { Search } from "./Components/Search/Search";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "search", element: <Search /> },
        {
          path: "categoriesDetails/:name",
          element: <CategoriesDetails />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "area",
          element: <Area />,
        },
        {
          path: "areaDetails/:name",
          element: <AreaDetails />,
        },
        {
          path: "ingredient",
          element: <Ingredient />,
        },
        {
          path: "ingredientsDetails/:name",
          element: <IngredientDetails />,
        },
        {
          path: "details/:id",
          element: <Details />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
