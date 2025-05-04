import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./RootLayout";
import { projects } from "./lib/projects";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        {projects.map((route, index) => {
          const RouteComponent = route.component;
          return (
            <Route key={index} path={route.link} element={<RouteComponent />} />
          );
        })}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
