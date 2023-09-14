import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import New_Expedient from "./pages/new_expedient-page";
import { AppRouter } from "./router/appRouter";

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
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
