import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Landing from "./layouts/Landing";
import Root from "./layouts/Root";
import Auth from "./layouts/Auth";
import Dashboard from "./layouts/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
