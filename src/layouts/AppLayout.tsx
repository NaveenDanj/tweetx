import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';

function AppLayout() {

  const [currentRoute , setCurrentRoute] = useState('/');
  const location = useLocation();
  
  useEffect(() => {
    setCurrentRoute(location.pathname);
    console.log(currentRoute);
  }, [location , currentRoute]);

  return (
    <div className='tw-w-full tw-h-[100vh]'>

      <div className='tw-w-full  tw-flex tw-justify-center tw-p-5 tw-border-1 tw-border-white/[.1 ] tw-shadow-md'>
        <div className='tw-flex tw-justify-between tw-flex-grow tw-max-w-[90%] '>
          <h1 className='tw-text-4xl tw-my-auto tw-font-bold tw-text-[#FF738D]'>TweetX</h1>

          <nav className='tw-flex tw-gap-10 tw-my-auto sm:tw-mr-64'>
            <NavLink style={{ color : currentRoute == '/' ? '#FF748D' : '#E3E3E3' }} to="/"><label className={'tw-my-auto tw-text-lg tw-font-semibold tw-cursor-pointer'}>Feed</label></NavLink>
            <NavLink style={{ color : currentRoute == '/users' ? '#FF748D' : '#E3E3E3' }} to="/users"><label className={'tw-my-auto tw-text-lg tw-font-semibold tw-cursor-pointer '}>Users</label></NavLink>
            <NavLink style={{ color : currentRoute == '/profile' ? '#FF748D' : '#E3E3E3' }} to="/profile"><label className={'tw-my-auto tw-text-lg tw-font-semibold tw-cursor-pointer '}>Profile</label></NavLink>
          </nav>

        </div>

      </div>

      <div className='tw-w-full tw-h-[calc(100vh-120px)] tw-p-5 tw-overflow-y-auto tw-justify-center tw-flex '>
        <Outlet />
      </div>


    </div>
  );
}

export default AppLayout;