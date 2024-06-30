import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./page/cart";
import LoginPage from "./page/login";
import HomePage from "./page/home";
import Layout from "./component/layout";
import OrchidManagement from "./page/quan-ly";
import Detail from "./page/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/orchid-management",
        element: <OrchidManagement />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
