import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./RootLayout";
import PizzaOrderProject from "./pages/PizzaOrderProject";
import CheckList from "./pages/ChecklistProject";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="projects/pizzarella" element={<PizzaOrderProject />} />
        <Route path="projects/checklist" element={<CheckList />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
