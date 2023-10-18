import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import New_Expedient from "./components/modal/new_expedient";
import Home from "./pages/home";
import { AppRouter } from "./router/appRouter";
import Expedient from "./pages/expedient";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

import "./styles/app.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/new/expedient",
        element: <New_Expedient />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/expedient",
        element: <Expedient />,
      },
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
