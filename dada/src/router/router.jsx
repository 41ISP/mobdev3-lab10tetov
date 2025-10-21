import MovieDetailsCard from "../pages/MovieDetailsCard/MovieDetailsCard";
import SearchCard from "../pages/SearchCard/SearchCard";
import {createBrowserRouter} from "react-router-dom"
   export const router = createBrowserRouter([
{
        path: "/",
        element: <SearchCard />
    },
    {
        path: "movie/:id",
        element: <MovieDetailsCard />
    }
]
)
export  default router