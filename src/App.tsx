import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { authState } from "./atoms/globalAtoms";
import { userConnectionsState } from "./atoms/userAtoms";
import {
  DashHome,
  DashProfile,
  FindBrokers,
  FindProperties,
  Home,
  Login,
  Notifications,
  Register,
  Support,
  ViewListing,
} from "./pages";
import AuthServices from "./services/AuthServices";
import ConnectionServices from "./services/ConnectionService";

function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const setMyConnections = useSetRecoilState(userConnectionsState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/find-brokers",
      element: <FindBrokers />,
    },
    {
      path: "/find-listings",
      element: <FindProperties />,
    },
    {
      path: "/support",
      element: <Support />,
    },
    {
      path: "/auth",
      children: [
        {
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
        {
          path: "/auth/forgot-password",
          element: <Home />,
        },
      ],
    },
    {
      path: "/listing",
      children: [
        // {
        //   path: "/listing/create",
        //   element: <AddListing />,
        // },
        {
          path: "/listing/view/:id",
          element: <ViewListing />,
        },
        // {
        //   path: "/listing/edit/:id",
        //   element: <Home />,
        // },
      ],
    },
    {
      path: "/dashboard",
      children: [
        {
          path: "/dashboard/home",
          element: <DashHome />,
        },
        {
          path: "/dashboard/profile",
          element: <DashProfile />,
        },
        {
          path: "/dashboard/notifications",
          element: <Notifications />,
        },
      ],
    },
  ]);

  useEffect(() => {
    const validateUser = async () => {
      const response = await AuthServices.ValidateUser();

      if (response.email !== "" && response.email !== undefined) {
        setAuth({
          isAuth: true,
          user: response,
        });
      }
    };

    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      validateUser();
    }
  }, [setAuth]);

  // get my connections
  useEffect(() => {
    const getMyConnections = async () => {
      const response = await ConnectionServices.getMyConnections();

      if (response) {
        setMyConnections(response);
      }
    };

    if (auth.user._id) {
      getMyConnections();
    }
  }, [auth, setMyConnections]);

  return <RouterProvider router={router} />;
}

export default App;
