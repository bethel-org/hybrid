import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import EditPage from "../pages/edit/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit",
    element: <EditPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
