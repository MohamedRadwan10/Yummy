import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAreaDetails } from "../../Redux/AreaDetailsSlice";
import { Helmet } from "react-helmet";
import { Circles } from "react-loader-spinner";

export const AreaDetails = () => {
  let { name } = useParams();
  let dispatch = useDispatch();

  let { AreaDetails, loading, isError } = useSelector(
    (state) => state.AreaDetails
  );

  useEffect(() => {
    if (name) {
      dispatch(getAreaDetails(name));
    }
  }, [dispatch, name]);
  return (
    <>
      {loading ? (
        <>
          {" "}
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
            <title>AreaDetails</title>
            <meta name="description" content="Area Details Page" />
          </Helmet>{" "}
          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}
          <div className="row g-4 ">
            {AreaDetails.map((product) => (
              <div key={product.idMeal} className="col-md-2 overflow-hidden">
                <Link className="" to={`/details/${product.idMeal}`}>
                  <div className=" position-relative meal cursor-pointer  text-white">
                    <img
                      className="w-100 rounded-2 "
                      src={product.strMealThumb}
                      alt=""
                    />
                    <div className="meal-layer mx-auto rounded-2 text-white d-flex justify-content-center align-items-center  position-absolute">
                      <h3>
                        {product.strMeal?.split(" ").slice(0, 3).join(" ")}
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
