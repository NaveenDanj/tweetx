import { useState } from 'react';
import FollowItem from './FollowItem';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function FollowersTab() {

  const [loading , setLoading] = useState(false);

  return (
    <div className='tw-w-full tw-mt-3 tw-gap-1 tw-flex tw-flex-col'>
      
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />

      <div className='tw-w-full tw-flex tw-justify-center tw-my-3 '>
        <button style={{ border: '1px solid rgba(0,0,0,0.5)' }} className="tw-w-[120px] tw-p-3  tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">{loading ? <AutorenewIcon className="tw-animate-spin" /> : 'Load more'}</button>
      </div>

    </div>
  );
}

export default FollowersTab;