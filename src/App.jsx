import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useExpedients from "./hooks/useExpedients";
import { useEffect } from "react";

import { AppRouter } from "./router/appRouter";
import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import Home from "./pages/home";
import Expedient from "./pages/expedient";
import FirsLogin from "./pages/firsLogin";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/app.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
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

function App() {
  const { listExpedientStates, listExpedientTypes } = useExpedients();

  useEffect(() => {
    listExpedientTypes();
    listExpedientStates();
  }, []);

  return (
    <div>
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
