import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHome } from "../../Redux/HomeSLice";
import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export const Home = () => {
  let { Home, loading, isError } = useSelector((state) => state.Home);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHome());
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className=" d-flex justify-content-center align-items-center ">
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
            <title>Yummy</title>
            <meta name="description" content="Home Page" />
          </Helmet>
          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}

          <div className="row g-4 ">
            {Home.map((item) => (
              <div key={item.idMeal} className="col-md-2 overflow-hidden">
                <Link className="" to={`/details/${item.idMeal}`}>
                  <div className="  position-relative meal cursor-pointer text-center text-white">
                    <img
                      className="w-100 rounded-2"
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      draggable="false"
                    />
                    <div className="meal-layer  text-white d-flex justify-content-center rounded-2 align-items-center  position-absolute">
                      <h3>{item.strMeal}</h3>
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
