import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    window.localStorage.setItem("isAuth", "true");

    navigate("/");
  };

  return (
    <div className="h-screen w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Card className="w-96">
        <CardHeader>
          <h1 className="font-semibold text-2xl">HeathLight</h1>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex flex-col gap-2">
            <Input placeholder="Username" />
            <Input placeholder="Password" />

            <span className="text-sm">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-bold underline hover:scale-105 transition-all inline-block"
              >
                Create one
              </a>
            </span>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            className="w-full"
            onClick={() => {
              handleLogIn();
            }}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
