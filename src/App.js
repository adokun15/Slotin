import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootElement from "./page/rootElement";
import Authenication, { AuthAction } from "./page/Authentication";
import Error from "./page/Error";
import UserError from "./page/UserError";
import HomePage from "./page/HomePage";
import WithDrawPage from "./page/WithDrawPage";
import { logout } from "./page/logout";
import TransferPage from "./page/TransferPage";
import FundPage from "./page/FundPage";
import EditInfo from "./page/EditInfo";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      action: AuthAction,
      errorElement: <Error />,
      element: <Authenication />,
    },
    {
      path: "/:userID",
      element: <RootElement />,
      errorElement: <UserError />,
      children: [
        { path: "/:userID", element: <HomePage /> },
        { path: "withdrawal", element: <WithDrawPage /> },
        { path: "transfer", element: <TransferPage /> },
        { path: "fund", element: <FundPage /> },
        { path: "info", element: <EditInfo /> },
      ],
    },
    {
      path: "/logout",
      action: logout,
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
