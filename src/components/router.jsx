import { AppRouter } from "../router/appRouter";
import ErrorPage from "../pages/error-page";
import Login from "../pages/login";
import Home from "../pages/home";
import Expedient from "../pages/expedient";
import FirsLogin from "../pages/firsLogin";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/*",
        element: <Home />,
      },
      {
        path: "/expediente/:expedientId",
        element: <Expedient />,
      },
      {
        path: "/actualizar-contraseña",
        element: <FirsLogin />,
      },
    ],
  },
]);

export default router;
