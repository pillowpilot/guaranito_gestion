import { Suspense, lazy, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import AuthContext from "./contexts/AuthProvider";
import "./i18n/i18n";
import "./App.css";

// Pages
import CommonLayout from "./layouts/root/RootLayout";
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
import LoginPage from "./pages/login/LoginPage";
import NotFoundPage from "./pages/notfound/NotFound";
import { DetailLot, ListLots, LotMap, CreateLot } from "./pages/lots";
import { ListUsers, CreateUser, DetailsUser } from "./pages/users";

const ListInferences = lazy(() =>
  import("./pages/inference").then((m) => ({ default: m.ListInferences }))
);
const CreateInference = lazy(() =>
  import("./pages/inference").then((m) => ({ default: m.CreateInference }))
);
const DetailInference = lazy(() =>
  import("./pages/inference").then((m) => ({ default: m.DetailInference }))
);
import {
  ListProperties,
  CreateProperty,
  DetailProperty,
  PropertyMap,
} from "./pages/properties";

const Logout = () => {
  const queryClient = useQueryClient();
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  queryClient.clear();
  useEffect(() => {
    onLogout();
    navigate("/login");
  });

  return <span>Loading...</span>;
};

const RootComponent = () => {
  const { auth } = useContext(AuthContext);
  if (!auth.isAuthenticated) return <Navigate to="/login" />;
  return <CommonLayout />;
};

const LoginComponent = () => {
  const { auth } = useContext(AuthContext);
  if (auth.isAuthenticated) return <Navigate to="/" />;
  return <LoginPage />;
};

function App() {
  const { auth } = useContext(AuthContext);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  console.log(auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootComponent />,
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<LinearProgress />}>
              <DashboardPage />,
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: <DetailsUser id={auth.id} />,
        },
        {
          path: "properties",
          children: [
            {
              path: "",
              element: <ListProperties />,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  element: <DetailProperty />,
                },
                {
                  path: "map",
                  element: <PropertyMap />,
                },
              ],
            },
            {
              path: "new",
              element: <CreateProperty />,
            },
          ],
        },
        {
          path: "lots",
          children: [
            {
              path: "",
              element: <ListLots />,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  element: <DetailLot />,
                },
                {
                  path: "map",
                  element: <LotMap />,
                },
              ],
            },
            {
              path: "new",
              element: <CreateLot />,
            },
          ],
        },
        {
          path: "users",
          children: [
            {
              path: "",
              element: <ListUsers />,
            },
            {
              path: ":id",
              element: <DetailsUser />,
            },
            {
              path: "new",
              element: <CreateUser />,
            },
          ],
        },
        {
          path: "inference",
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<LinearProgress />}>
                  <ListInferences />,
                </Suspense>
              ),
            },
            {
              path: ":id",
              element: (
                <Suspense fallback={<LinearProgress />}>
                  <DetailInference />
                </Suspense>
              ),
            },
            {
              path: "new",
              element: (
                <Suspense fallback={<LinearProgress />}>
                  <CreateInference />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
