import { Root } from "./components/Root";
import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import Home from "./pages/home";
import Expedient from "./pages/expedient";
import FirsLogin from "./pages/firsLogin";

import { createBrowserRouter } from "react-router-dom";
import ExpedientsTab from "./components/expedientsTab";

import ExpedientsInbox from "./components/table/ExpedientsInbox";
import MyExpedientsTable from "./components/table/MyExpedientsTable";
import QueryContent from "./components/queryContent";
import UsersTable from "./components/table/UsersTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/expedientes",
        element: <ExpedientsTab />,
        children: [
          {
            path: "bandeja-de-entrada", // <-- Ruta relativa
            element: <ExpedientsInbox />,
          },
          {
            path: "mis-expedientes", // <-- Ruta relativa
            element: <MyExpedientsTable />,
          },
        ],
      },
      {
        path: "/consulta",
        element: <QueryContent />,
      },
      {
        path: "/usuarios",
        element: <UsersTable />,
      },
    ],
  },
  {
    path: "/expediente/:expedientId",
    element: <Expedient />,
  },
  {
    path: "actualizar-contraseña",
    element: <FirsLogin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
