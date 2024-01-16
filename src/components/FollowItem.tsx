import { Avatar } from '@mui/material';

function FollowItem() {
  return (
    <div className='tw-p-5 tw-flex tw-w-full tw-justify-between'>

      <div className='tw-flex tw-gap-5 tw-my-auto'>
        <Avatar sx={{ width : 50 , height : 50 }} />

        <div className='tw-w-full tw-flex tw-flex-col tw-justify-between'>
          <label className='tw-text-xl tw-my-auto'>Arjun Reddy</label>
          <label className='tw-text-xs tw-my-auto tw-text-[#C6C6C6]'>Following : 200</label>
        </div>

      </div>

      <button className="tw-my-auto tw-bg-[#FF748D] tw-shadow-lg tw-text-white tw-w-[100px] tw-p-2 tw-items-center tw-px-5 tw-rounded-[11px] tw-font-bold tw-flex tw-justify-center">Follow</button>

    </div>
  );
}

export default FollowItem;