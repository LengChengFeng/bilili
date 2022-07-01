import { useRoutes, Navigate } from "react-router-dom";
import React from "react";
const Home = React.lazy(() => import("../views/home"));
const Search = React.lazy(() => import("../views/home/cpn/search"));
const SongMv = React.lazy(() => import("../views/home/cpn/SongMv"));

const Content = React.lazy(() => import("../views/content"));
const SongList = React.lazy(() => import("../views/content/cpn/songs"));

const Buy = React.lazy(() => import("../views/buy"));
const Mine = React.lazy(() => import("../views/mine"));
export const routes = [
  {
    path: "",
    element: <Navigate to={"/home"} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/content",
    element: <Content />,
  },
  {
    path: "/buy",
    element: <Buy />,
  },
  {
    path: "/mine",
    element: <Mine />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/mv/:id",
    element: <SongMv />,
  },
  {
    path: "/song/:id",
    element: <SongList />,
  },
];

const Routes = () => useRoutes(routes);
export default Routes;
