import { useEffect } from "react";

import useExpedients from "./hooks/useExpedients";
import useAreas from "./hooks/useAreas";

import router from "./Router";

import { RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/app.css";

function App() {
  const { listExpedientStates, listExpedientTypes } = useExpedients();
  const { getAreas } = useAreas();

  useEffect(() => {
    listExpedientTypes();
    listExpedientStates();
    getAreas();
  }, []);

  return (
    <>
       <RouterProvider router={router} />
    </>
  );
}

export default App;
