import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
]);

export const AppRouter = () => {
    console.log(router);
    return (
        <RouterProvider router={router}/>
    )
}
