import React from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { paths } from "../services/utils/paths";

import AuthContext from "../contexts/auth";
//rotas não-autenticadas
import Login from "../views/non-auth/login/Login";
// // import Logout from "../views/non-auth/logout/logout";
// import Signup from "../views/non-auth/signup/Signup";

//rotas autenticadas
import Dashboard from "../views/auth/dashboard/Dashboard";
import NotFound from "../views/non-auth/not-found/NotFound";
import Navbar from "../components/sidebar/Sidebar";
import TestingPage from "../views/auth/testing-page/TestingPage";
import LogsPage from "../views/auth/logs-page/LogsPage";

import MonitoringPage from "./../views/auth/monitoring-page/MonitoringPage";

const AppRoutes = () => {
  const { state, signed, user } = useContext(AuthContext);

  //   function RequireAuth({ children, redirectTo }) {
  //     let isAuthenticated = signed || state.isLoggedIn;
  //     return isAuthenticated ? children : <Navigate to={redirectTo} />;
  //   }

  const sidebarRoutes = [
    {
      path: paths.dashboard,
      RenderPage: Dashboard,
    },
    {
      path: paths.logs,
      RenderPage: LogsPage,
    },
    {
      path: paths.monitoring,
      RenderPage: MonitoringPage,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}

        <Route
          path="*"
          element={
            // <RequireAuth redirectTo="/login">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />

              <Route
                path="/testagem"
                element={<Navbar RenderPage={TestingPage} />}
              >
                <Route path=":modelId" element={<TestingPage />} />
              </Route>

              {sidebarRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.custom ? (
                      route.custom
                    ) : (
                      <Navbar RenderPage={route.RenderPage} />
                    )
                  }
                />
              ))}
            </Routes>
            // </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
