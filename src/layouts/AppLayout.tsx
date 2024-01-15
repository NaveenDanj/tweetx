import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className='tw-w-full tw-h-[100vh] '>

      <div className='tw-w-full  tw-flex tw-justify-center tw-p-5 tw-border-1 tw-border-white/[.1 ] tw-shadow-md'>
        <div className='tw-flex tw-justify-between tw-flex-grow tw-max-w-[90%] md:tw-max-w-[100%]'>
          <h1 className='tw-text-4xl tw-my-auto tw-font-bold tw-text-[#FF738D]'>TweetX</h1>

          <div className='tw-flex tw-gap-10 tw-my-auto sm:tw-mr-64'>
            <label className="tw-my-auto tw-text-lg tw-font-semibold tw-cursor-pointer tw-text-[#FF748D]">Feed</label>
            <label className="tw-my-auto tw-text-lg tw-font-semibold tw-cursor-pointer tw-text-[#E3E3E3]">Users</label>
            <label className="tw-my-auto tw-text-lg tw-font-semibold tw-cursor-pointer tw-text-[#E3E3E3]">Profile</label>
          </div>

        </div>

      </div>

      <div className='tw-w-full tw-h-[calc(100vh-80px)] tw-justify-center tw-flex '>
        <Outlet />
      </div>


    </div>
  );
}

export default AppLayout;