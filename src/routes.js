import SuperuserPage from "./pages/SuperuserPage";
import Map from "./pages/Map";
import Authentication from "./pages/Authentication";
import {
  SUPERUSER_ROUTE,
  MAP_ROUTE,
  LOGIN_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: SUPERUSER_ROUTE,
    Component: SuperuserPage,
  },
];

export const publicRoutes = [
  {
    path: MAP_ROUTE,
    Component: Map,
  },
  {
    path: LOGIN_ROUTE,
    Component: Authentication,
  },
];
