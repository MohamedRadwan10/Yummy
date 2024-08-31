import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { getIngredientDetails } from "../../Redux/IngredientDetails";

export const IngredientDetails = () => {
  let { IngredientDetails, loading, isError } = useSelector(
    (state) => state.IngredientDetails
  );
  let dispatch = useDispatch();
  let { name } = useParams();

  useEffect(() => {
    if (name) {
      dispatch(getIngredientDetails(name));
    }
  }, [dispatch, name]);
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
            <title>IngredientDetails</title>
            <meta name="description" content="IngredientDetails Page" />
          </Helmet>{" "}
          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}
          <div className="row g-4 ">
            {IngredientDetails?.map((product, index) => (
              <div
                key={product.idMeal || `${product.strIngredient}-${index}`}
                className="col-md-2 overflow-hidden"
              >
                <Link className="" to={`/details/${product.idMeal}`}>
                  <div className=" position-relative meal cursor-pointer    text-white">
                    <img
                      className="w-100 rounded-2"
                      src={product.strMealThumb}
                      alt=""
                    />
                    <div className="meal-layer text-white d-flex  justify-content-center align-items-center  position-absolute">
                      <h3>
                        {product.strMeal?.split(" ").slice(0, 5).join(" ")}
                      </h3>
                    </div>
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
