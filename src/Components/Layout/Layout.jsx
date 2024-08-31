import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="margin-top">
        <div className="container">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer />
    </>
  );
};
