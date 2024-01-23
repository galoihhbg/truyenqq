import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { publicRoutes } from './routes';
import { Fragment } from 'react';
function App() {
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
      </div>
    </Router>
  );
}

export default App;
