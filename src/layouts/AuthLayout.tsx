import { Outlet } from 'react-router-dom';
import LottieAnimation from '../components/LottieAnimation';

function AuthLayout() {
  return (
    <div className='tw-w-full tw-h-[100vh]'>

      <div className='tw-w-full tw-h-[100vh] md:tw-w-full tw-flex md:tw-flex-row tw-flex-col'>

        <div className='md:tw-w-[500px] tw-order-2 md:tw-order-1 tw-p-10'>
          <h1 className='tw-text-4xl tw-font-bold tw-text-[#FF738D]'>TweetX</h1>
          <Outlet />
        </div>

        <div className='tw-flex tw-flex-grow tw-order-1 tw-justify-center'>
          <LottieAnimation />
        </div>

      </div>

    </div>
  );
}

export default AuthLayout;