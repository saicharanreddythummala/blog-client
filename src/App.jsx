import { useContext, useEffect } from 'react';
import './App.css';
import webFont from 'webfontloader';
import NavBar from './components/nav/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';

import Main from './pages/Main';
import Register from './pages/register/Register';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { UserContext } from './context/Context';

function App() {

const {loading} = useContext(UserContext)

  useEffect(() => {
    webFont.load({
      google: {
        families: ['Ubuntu', 'Lustira', 'Metrophobic'],
      },
    });
  }, []);
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <NavBar />
          {/* <Categories /> */}

          <div id="wrapper" className="flex-grow-1 d-flex flex-column">
            <Routes>
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Main />
                   </ProtectedRoute>
                }
              />{' '}
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
