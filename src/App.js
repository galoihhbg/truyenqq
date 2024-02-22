import {BrowserRouter as Router, Routes, Route, Navigate}from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes';
import { Fragment } from 'react';

import Cookies from 'universal-cookie';
import config from './config';
const cookies = new Cookies();

// get cookie from browser if logged in

function App() {
  const token = cookies.get("TOKEN");
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route, index) => {
              // If this page dont have a layout, use Fragment as a tag that no need to add unnecessary node to DOM
              const Layout = route.layout === null ? Fragment : route.layout;
              const Page = route.component;
              // <Page> is a parameter of <Layout>, so it's embedded as 'chilren' and loaded into 'content'. Read file DefaultLayout for details.
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            })
          }
        </Routes>

        <Routes>
          {
            privateRoutes.map((route, index) => {
              // If this page dont have a layout, use Fragment as a tag that no need to add unnecessary node to DOM
              const Layout = route.layout === null ? Fragment : route.layout;
              const Page = route.component;
              // <Page> is a parameter of <Layout>, so it's embedded as 'chilren' and loaded into 'content'. Read file DefaultLayout for details.
              return <Route 
                key={index} path={route.path} 
                element={token ? <Layout><Page /></Layout> : 
                <Navigate
                    to={config.routes.login}
                    state={{ from: window.location.pathname }}
                  replace
                />} 
              />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
