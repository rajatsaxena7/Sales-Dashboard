import Header1 from "./components/LandingPage";
import Login from "./components/auth/login/index";
import Register from "./components/auth/register";
import Layout from "./components/home/layout";

import Home from "./components/home/index";

import { AuthProvider } from "./contexts/authContexts";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme/themeContext.jsx";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/header",
      element: <Header1 />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <ThemeProvider>
        <Layout>
          <div className="w-full h-screen flex flex-col">{routesElement}</div>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
