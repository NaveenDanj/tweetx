import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Feed from './pages/App/Feed';
import AppLayout from './layouts/AppLayout';
import Users from './pages/App/Users';
import Profile from './pages/App/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Feed />} />
          <Route path='/users' element={<Users />} />
          <Route path='/profile' element={<Profile />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
