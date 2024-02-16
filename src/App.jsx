import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import New_Expedient from "./components/modal/new_expedient";
import Home from "./pages/home";
import { AppRouter } from "./router/appRouter";
import Expedient from "./pages/expedient";
import FirsLogin from "./pages/firsLogin";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

import "./styles/app.css";
import ExpedientsTab from "./components/expedientsTab";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
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
      // {
      //   path: "/expedientes",
      //   element: <ExpedientsTab />,
      // },
    ],
  },
]);

function App() {
  return (
    <div>
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
