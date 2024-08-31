import React, { useEffect } from "react";
import { getCategories } from "../../Redux/CategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const Categories = () => {
  let { Categories, loading, isError } = useSelector(
    (state) => state.Categories
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
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
            <title>Categories</title>
            <meta name="description" content="Categories Page" />
          </Helmet>

          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}

          <div className="row g-4 ">
            {Categories?.map((product) => (
              <div
                key={product.idCategory}
                className="col-md-3 overflow-hidden"
              >
                <Link
                  className=" text-decoration-none text-black"
                  to={`/categoriesDetails/${product.strCategory}`}
                >
                  <div className=" position-relative meal cursor-pointer  rounded-2  text-white">
                    <img
                      className="w-100 rounded-2 "
                      src={product.strCategoryThumb}
                      alt={product.strMeal}
                      draggable="false"
                    />
                    <div className="meal-layer text-white rounded-2  position-absolute">
                      <h3 className="text-center">{product.strCategory}</h3>
                      <p className="p-2">
                        {product.strCategoryDescription
                          ?.split(" ")
                          .slice(0, 8)
                          .join(" ")}
                      </p>
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
