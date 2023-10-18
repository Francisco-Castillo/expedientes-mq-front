import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import New_Expedient from "./pages/new_expedient-page";
import home from "./pages/home";
import { AppRouter } from "./router/appRouter";

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
        element: <home />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
