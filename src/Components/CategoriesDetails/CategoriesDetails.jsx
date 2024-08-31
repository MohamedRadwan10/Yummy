import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategoriesDetails } from "../../Redux/CategoriesDetailsSlice";

export const CategoriesDetails = () => {
  const { name } = useParams();
  let dispatch = useDispatch();
  let { CategoriesDetails, loading, isError } = useSelector(
    (state) => state.CategoriesDetails
  );

  useEffect(() => {
    dispatch(getCategoriesDetails(name));
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
            <title>CategoryDetails</title>
            <meta name="description" content="CategoriesDetails Page" />
          </Helmet>

          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}

          <div className="row g-4 ">
            {CategoriesDetails.map((product) => (
              <div key={product.idMeal} className="col-md-2 overflow-hidden">
                <Link className="" to={`/details/${product.idMeal}`}>
                  <div className=" position-relative meal cursor-pointer  rounded-2  text-white">
                    <img
                      className="w-100 rounded-2"
                      src={product.strMealThumb}
                      alt={product.strMeal}
                      draggable="false"
                    />
                    <div className="meal-layer text-white d-flex rounded-2 justify-content-center align-items-center  position-absolute">
                      <h4>
                        {product.strMeal?.split(" ").slice(0, 5).join(" ")}
                      </h4>
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
