import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AccessBook,
  Books,
  BookView,
  CreateAccessCode,
  CreateBook,
  CreateStandard,
  Home,
  Layout,
  Login,
  Register,
  Standard,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as createStandardAction } from "./pages/CreateStandard";
import { action as createBookAction } from "./pages/CreateBook";
import { action as getSingleAction } from "./pages/Standard";
import { action as accessbookAction } from "./pages/AccessBook";
import { action as createaccessAction } from "./pages/CreateAccessCode";

import { loader as layoutLoader } from "./pages/Layout";
import { loader as bookLoader } from "./pages/Books";
import { loader as bookaccessLoader } from "./pages/AccessBook";
import { loader as bookviewLoader } from "./pages/BookView";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <Standard />,
        action: getSingleAction,
      },
      {
        path: "books",
        element: <Books />,
        loader: bookLoader,
      },
      {
        path: "access-books/:id",
        element: <AccessBook />,
        action: accessbookAction,
        loader: bookaccessLoader,
      },
      {
        path: "create-standard",
        element: <CreateStandard />,
        action: createStandardAction,
      },
      {
        path: "create-book",
        element: <CreateBook />,
        action: createBookAction,
      },
      {
        path: "bookview/:id",
        element: <BookView />,
        loader: bookviewLoader,
      },
      {
        path: "create-access-code",
        element: <CreateAccessCode />,
        action: createaccessAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
