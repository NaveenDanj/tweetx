import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Feed from './pages/App/Feed';
import AppLayout from './layouts/AppLayout';
import Users from './pages/App/Users';
import Profile from './pages/App/Profile';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './config/FirebaseConfig';
import Loading from './components/Loading';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthState(true);
        console.log(user);
      } else {
        setAuthState(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };

  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route index element={ <PrivateRoute isAuth={authState} element={<Feed />} /> } />
          <Route path='/users' element={<PrivateRoute isAuth={authState} element={<Users />} />} />
          <Route path='/profile' element={<PrivateRoute isAuth={authState} element={<Profile />} />} />
        </Route>

        {/* <PrivateRoute isAuth={authState} element={<StarredMessages />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
