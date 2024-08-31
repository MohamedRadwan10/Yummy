import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../Redux/DetailsSlice";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export const Details = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let { Details, loading, isError } = useSelector((state) => state.Details);

  const ingredients = [];
  for (let i = 0; i <= 20; i++) {
    if (Details[`strIngredient${i}`]) {
      ingredients.push(
        <li className="bg-main border-radius text-white m-2 p-2" key={i}>
          {Details[`strMeasure${i}`]} {Details[`strIngredient${i}`]}
        </li>
      );
    }
  }

  const tags = Details.strTags ? Details.strTags.split(",") : [];
  const tagsList = tags.map((tag, index) => (
    <li className="alert alert-secondary m-2 p-2" key={index}>
      {tag}
    </li>
  ));

  useEffect(() => {
    if (id) {
      dispatch(getDetails(id));
    }
  }, [dispatch, id]);

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
            <title>Details</title>
            <meta name="description" content="Details Page" />
          </Helmet>{" "}
          
          {isError && (
            <div className="alert alert-danger ">
              <p className="text-white">
                An error occurred while fetching data.
              </p>
            </div>
          )}

          <div className="row g-4">
            <div className="col-md-4 details text-black">
              <div className="">
                <img
                  className="w-100 "
                  src={Details.strMealThumb}
                  alt={Details.strMeal}
                />
                <h1>{Details.strMeal}</h1>
              </div>
            </div>
            <div className="col-md-8 text-black">
              <div className="instruction-details">
                <h3>Instructions</h3>
                <p className="text-color my-3">{Details.strInstructions}</p>
                <h3>
                  Area: <span className="text-color">{Details.strArea}</span>
                </h3>
                <h3>
                  Category:{" "}
                  <span className="text-color">{Details.strCategory}</span>
                </h3>
                <h3 className="mb-4">Recipes:</h3>
                <ul className="list-unstyled d-flex g-3 flex-wrap">
                  {ingredients}
                </ul>
                <h3>Tags:</h3>
                <ul className="list-unstyled d-flex g-3 flex-wrap pb-3">
                  {tagsList}
                </ul>
                <a
                  target="-blank"
                  href={Details.strSource}
                  className="btn btn-outline-success"
                >
                  Source
                </a>
                <a
                  target="-blank"
                  href={Details.strYoutube}
                  className="btn mx-2 btn-outline-danger"
                >
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
