import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Root = () => {
  return (
    <div className="relative w-full h-full">
      <main>{<Outlet />}</main>
      <Navbar />
    </div>
  );
};

export default Root;
