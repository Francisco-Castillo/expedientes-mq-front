import { Root } from "./components/Root";
import ErrorPage from "./pages/errorPage";
import Login from "./pages/login";
import Home from "./pages/home";
import Expedient from "./pages/expedient";
import FirsLogin from "./pages/firsLogin";

import { createBrowserRouter, Navigate } from "react-router-dom";
import ExpedientsTab from "./components/expedientsTab";
import ExpedientsInbox from "./components/table/ExpedientsInbox";
import MyExpedientsTable from "./components/table/MyExpedientsTable";
import QueryContent from "./components/queryContent";
import UsersTable from "./components/table/UsersTable";

import ProtectedRouter from "./helpers/ProtectedRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRouter>
        <Root />
      </ProtectedRouter>
    ),
    children: [
      {
        path: "/home/expedientes",
        element: (
          <ProtectedRouter>
            <ExpedientsTab />
          </ProtectedRouter>
        ),
        children: [
          {
            path: "bandeja-de-entrada",
            element: (
              <ProtectedRouter>
                <ExpedientsInbox />
              </ProtectedRouter>
            ),
          },
          {
            path: "mis-expedientes",
            element: (
              <ProtectedRouter>
                <MyExpedientsTable />
              </ProtectedRouter>
            ),
          },
        ],
      },
      {
        path: "/home/consulta",
        element: (
          <ProtectedRouter>
            <QueryContent />
          </ProtectedRouter>
        ),
      },
      {
        path: "/home/usuarios",
        element: (
          <ProtectedRouter>
            <UsersTable />
          </ProtectedRouter>
        ),
      },
    ],
  },
  {
    path: "/expediente/:expedientId",
    element: (
      <ProtectedRouter>
        <Expedient />
      </ProtectedRouter>
    ),
  },
  {
    path: "/actualizar-contraseña",
    element: (
      <ProtectedRouter>
        <FirsLogin />
      </ProtectedRouter>
    ),
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
]);

export default router;
