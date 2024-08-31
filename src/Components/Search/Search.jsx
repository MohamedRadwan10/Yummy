import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getSearch, getSearchByName } from "../../Redux/SearchSlice";
import { Circles } from "react-loader-spinner";
import { Home } from "../Home/Home";
export const Search = () => {
  const [searchName, setSearchName] = useState("");
  const [fLetter, setFLetter] = useState("");

  const { name } = useParams();
  const dispatch = useDispatch();

  const { Search, SearchByName, loading, isError } = useSelector(
    (state) => state.Search
  );

  useEffect(() => {
    if (name) {
      dispatch(getSearch(name));
      dispatch(getSearchByName(name));
    }
  }, [dispatch, name]);

  const handleSearchByName = (e) => {
    const value = e.target.value;
    setSearchName(value);
    dispatch(getSearch(value));
  };

  const handleSearchByFirstLetter = (e) => {
    const value = e.target.value;
    setFLetter(value);
    dispatch(getSearchByName(value));
  };

  return (
    <>
      <Helmet>
        <title>Search</title>
        <meta name="description" content="search page" />
      </Helmet>

      <form className="row g-3 mb-5">
        <div className="col-md-6">
          <input
            id="name"
            value={searchName}
            onChange={handleSearchByName}
            className="form-control"
            type="text"
            placeholder="Search By Name"
          />
        </div>
        <div className="col-md-6">
          <input
            value={fLetter}
            onChange={handleSearchByFirstLetter}
            className="form-control"
            maxLength="1"
            type="text"
            placeholder="Search By First Letter"
          />
        </div>
      </form>
      {isError && (
        <div className="alert alert-danger ">
          <p className="text-white">An error occurred while fetching data.</p>
        </div>
      )}
      {loading && (
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
      )}

      <div className="row g-4">
        {Search && Search.length > 0 ? (
          <>
            {Search.map((item) => (
              <div key={item.idMeal} className="col-md-2 overflow-hidden">
                <Link className="" to={`/details/${item.idMeal}`}>
                  <div className="position-relative meal cursor-pointer   text-center text-white">
                    <img
                      className="w-100"
                      src={item.strMealThumb}
                      alt={item.strMeal}
                    />
                    <div className="meal-layer text-white  d-flex justify-content-center align-items-center">
                      <h3>{item.strMeal}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : null}
      </div>

      <div className="row g-4 mt-2">
        {SearchByName && SearchByName.length > 0 ? (
          <>
            {SearchByName.map((item) => (
              <div key={item.idMeal} className="col-md-2 overflow-hidden">
                <Link className="" to={`/details/${item.idMeal}`}>
                  <div className="position-relative meal cursor-pointer text-white">
                    <img
                      className="w-100"
                      src={item.strMealThumb}
                      alt={item.strMeal}
                    />
                    <div className="meal-layer text-white d-flex justify-content-center align-items-center ">
                      <p className="fs-4">
                        {item.strMeal.split(" ").slice(0, 4).join(" ")}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : null}
      </div>

      {(!Search || Search.length === 0) &&
        (!SearchByName || SearchByName.length === 0) && (
          <div className="mt-3">
            <Home />
          </div>
        )}
    </>
  );
};
