import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { getArea } from "../../Redux/AreaSlice";

export const Area = () => {
  let { Area, loading, isError } = useSelector((state) => state.Area);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArea());
  }, []);
  return (
    <>
      {loading == false ? (
        <>
          <Helmet>
            <title>Area</title>
            <meta name="description" content="Area Page" />
          </Helmet>
          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}
          <div className="row g-4">
            {Area.map((product) => (
              <div key={product.strArea} className="col-md-3">
                <Link
                  className=" text-decoration-none text-black"
                  to={`/areaDetails/${product.strArea}`}
                >
                  <div className=" cursor-pointer product text-center">
                    <i className="fa-solid fa-globe"></i>
                    <h3 className="p-2 ">{product.strArea}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
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
      )}
    </>
  );
};
