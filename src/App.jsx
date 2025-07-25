import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import { Toaster } from "react-hot-toast";
import TokenProvider from "./Context/Token-Context";
import ProtectedRout from "./ProtectedRout/ProtectedRout";

function App() {
  let x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRout>
              {" "}
              <Home />{" "}
            </ProtectedRout>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRout>
              {" "}
              <Home />{" "}
            </ProtectedRout>
          ),
        },
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <SignIn /> },
      ],
    },
  ]);

  return (
    <>
      <TokenProvider>
        <RouterProvider router={x} />
        <Toaster position="top-center" reverseOrder={false} />
      </TokenProvider>
    </>
  );
}

export default App;
