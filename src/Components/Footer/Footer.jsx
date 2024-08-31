import React from "react";
import Style from './Footer.module.css'
export const Footer = () => {
  return (
    <>
      <footer className="bg-main-light py-5">
        <div className="container ">
          <h4 className=" fw-bolder">Get the Yummy App!</h4>
          <p>We will sent you a link, open it on your phone to download it</p>
          <form className="row py-3 g-3 border-bottom border-opacity-25 border-dark justify-content-between align-items-center">
            <div className="col-md-9">
            <input
                className={` ${Style.inp} ${"w-100"}`}
                type="email"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="col-md-3  text-end ">
              <button className={` ${" w-100  btn bg-main text-white"}`}>
                Share App Link
              </button>
            </div>
          </form>

          <div className="text-center p-3">© 2024 Copyright</div>
        </div>
      </footer>
    </>
  );
};
