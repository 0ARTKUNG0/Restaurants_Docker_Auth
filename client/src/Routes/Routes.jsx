import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AddRestaurant from "../Pages/AddRestaurant";
import UpdateRestaurant from "../Pages/UpdateRestaurant";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/add-restaurant",
        element: <AddRestaurant />,
    },
    {
        path: "/update-restaurant/:id",
        element: <UpdateRestaurant />,
    },
]);
export default router;
