import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MovieList from "@/pages/movieList";
import MovieDetails from "@/pages/movieDetails";

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
    return <RouterProvider router={router} />
}
export default Routes