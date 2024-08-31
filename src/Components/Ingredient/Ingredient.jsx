import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { getIngredient } from "../../Redux/IngredientSlice";

export const Ingredient = () => {
  let { Ingredient, loading, isError } = useSelector(
    (state) => state.Ingredient
  );
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredient());
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="d-flex justify-content-center align-items-center">
            <Circles
              height="80"
              width="80"
              color="#dc9015"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          <Helmet>
            <title>Ingredient</title>
            <meta name="description" content="Ingredient Page" />
          </Helmet>{" "}
          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}
          <div className="row g-4">
            {Ingredient?.map((product, index) => (
              <div
                key={
                  product.strIngredient
                    ? product.strIngredient
                    : `ingredient-${index}`
                }
                className="col-md-3"
              >
                <Link
                  className=" text-decoration-none text-black"
                  to={`/ingredientsDetails/${product.strIngredient}`}
                >
                  <div className="cursor-pointer g-2 product text-center">
                    <i className="fa fa-cookie-bite "></i>
                    <h3 className=" ">{product.strIngredient}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
