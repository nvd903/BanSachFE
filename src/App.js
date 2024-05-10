import { publicRouter, privateRouter } from "./routes";
import DefaultLayout from "./Layouts/DefaultLayout";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { parseJwt } from "./Ultilities";

function App() {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const PrivateRoutes = () => {
    const auth = !currentUser
      ? false
      : parseJwt(currentUser.accessToken).isadmin;
    return auth ? <Outlet /> : <Navigate to="/loggin" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouter.map((route, index) => {
            const Page = route.component;
            let Layout = route.layout || DefaultLayout;
            if (Layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          ;
          <Route element={<PrivateRoutes />}>
            {privateRouter.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout || DefaultLayout;
              if (Layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
