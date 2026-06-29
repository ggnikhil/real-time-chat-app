import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register"
import WelcomePage from "../features/auth/pages/WelcomePage"
import Otp from "../features/auth/pages/Otp"
import Dashboard from "../features/chats/pages/Dashboard";

export const AppRouter = createBrowserRouter([
    {
        path:"/",
        element:<h1>welcome to home page</h1>

    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    },
    {
        path:"/welcomepage",
        element:<WelcomePage />
    },
    {
        path:"/verifyotp",
        element:<Otp/>
    },{
        path:"/dashboard",
        element:<Dashboard/>
    }
])