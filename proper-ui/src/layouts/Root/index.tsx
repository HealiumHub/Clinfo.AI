import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Root = () => {
  return (
    <div className="relative w-screen h-full">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default Root;
