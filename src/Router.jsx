import { Root } from "./components/Root";
import ErrorPage from "./pages/errorPage";
import Login from "./pages/login";
import Expedient from "./pages/expedient";
import FirsLogin from "./pages/firsLogin";

import { createBrowserRouter, Navigate } from "react-router-dom";
import ExpedientsTab from "./components/expedientsTab";
import ExpedientsInbox from "./components/table/ExpedientsInbox";
import MyExpedientsTable from "./components/table/MyExpedientsTable";
import QueryContent from "./components/queryContent";
import UsersTable from "./components/table/UsersTable";
import AreasTable from "./components/table/AreasTables";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <Root />,
    children: [
      {
        path: "expedientes",
        element: <ExpedientsTab />,
        children: [
          {
            path: "bandeja-de-entrada",
            element: <ExpedientsInbox />,
          },
          {
            path: "mis-expedientes",
            element: <MyExpedientsTable />,
          },
        ],
      },
      {
        path: "consulta",
        element: <QueryContent />,
      },
      {
        path: "usuarios",
        element: <UsersTable />,
      },
      {
        path: "areas",
        element: <AreasTable />,
      },
    ],
  },
  {
    path: "expediente/:expedientId",
    element: <Expedient />,
  },
  {
    path: "actualizar-contraseña",
    element: <FirsLogin />,
  },
]);

export default router;
