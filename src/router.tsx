import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import NotFound from "./pages/notFound/NotFound";
import Layout from "./components/layout/Layout";

// criar rotas de navegação
const router = createBrowserRouter([
  {
    element: <Layout />, // renderiza o header
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/works/:key",
        element: <Detail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export { router };
