import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AddRestaurant from "../Pages/AddRestaurant";
import UpdateRestaurant from "../Pages/UpdateRestaurant";
import LoginRestaurant from "../Pages/LoginRestaurant";
import RegisterRestaurant from "../Pages/RegisterRestaurant";
import ProtectedRoute from "../Component/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/add-restaurant",
        element: (
            <ProtectedRoute>
                <AddRestaurant />
            </ProtectedRoute>
        ),
    },
    {
        path: "/update-restaurant/:id",
        element: (
            <ProtectedRoute>
                <UpdateRestaurant />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: <LoginRestaurant />,
    },
    {
        path: "/register",
        element: <RegisterRestaurant />,
    },
]);

export default router;
