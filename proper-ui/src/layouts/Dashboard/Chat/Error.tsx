import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-16">
      <img
        src="/RMIT_logo_red.png"
        alt=""
        className="h-56 w-56 animate-bounce"
      />
      <p className="text-lg font-semibold text-center mt-4 opacity-60">
        Unexpected error occurred. Please try again later.
      </p>
      <Link to="/dashboard/chart">
        <Button>Try again</Button>
      </Link>
    </div>
  );
};

export default Error;
