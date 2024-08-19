import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Landing from "./layouts/Landing";
import Root from "./layouts/Root";
import Auth from "./layouts/Auth";
import Dashboard from "./layouts/Dashboard";
import Chat from "./layouts/Dashboard/Chat";
import Workspace from './layouts/Dashboard/Workspace';
import { QueryClient, QueryClientProvider } from 'react-query'
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
    children: [
      {
        path: "",
        element: <Chat />,
      },
      {
        path: "workspace",
        element: <Workspace />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "settings",
        element: <div>Chat</div>,
      },
      {
        path: "profile",
        element: <div>Chat</div>,
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
