import {useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {io} from "socket.io-client";

import {Home} from "@/app/routes/home.tsx";
import {Login, Register} from "@/app/routes/auth";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/auth/login",
        element: <Login/>,
    },
    {
        path: "/auth/register",
        element: <Register/>,
    }
]);


export const AppRouter = () => {

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SERVER_API_URL);
        socket.connect();
    }, []);

    console.log(router);
    return (
        <RouterProvider router={router}/>
    )
}
