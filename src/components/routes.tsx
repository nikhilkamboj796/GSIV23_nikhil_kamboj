import MovieDetails from "@/pages/movieDetails";
import MovieList from "@/pages/movieList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieList />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
  },
]);
const Routes = () => {
  return <RouterProvider router={router} />;
};
export default Routes;
