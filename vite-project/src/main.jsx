import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./utils/App.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import { coursesLoader } from "./loaders/coursesLoader";
import { courseLoader } from "./loaders/courseLoader";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Provider } from "react-redux";
import store from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "courses",
        element: <Courses />,
        loader: coursesLoader,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetails />,
        loader: courseLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
