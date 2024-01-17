import { Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import PostTab from '../../components/PostTab';
import FollowersTab from '../../components/FollowersTab';
import FollowingTab from '../../components/FollowingTab';


function Profile() {

  const [currentTab , setCurrentTab] = useState('post');

  return (
    <div className="tw-flex tw-flex-col tw-mt-10 tw-flex-grow tw-max-w-[700px] ">

      <div className="tw-mt-10 tw-flex tw-gap-10 md:tw-gap-24">
        
        <div>
          <Avatar sx={{ width : 100 , height : 100 }} />
        </div>

        <div className='tw-flex tw-flex-col tw-w-full'>
          <label className='tw-text-2xl tw-my-auto'>Arjun Reddy</label>

          <div className='tw-flex tw-gap-5 md:tw-gap-10 tw-w-full'>
            <label>Post : 511</label>
            <label>Followers : 511</label>
            <label>Following : 511</label>
          </div>

        </div>

      </div>

      <div className=' tw-mt-20 tw-mx-2 md:tw-mx-16 tw-flex tw-justify-around' style={{ borderTop : '1px solid rgba(224,224,224,0.8)' }}>
      </div>

      <div className='tw-flex tw-justify-around tw-w-full'>

        <div onClick={() => setCurrentTab('post')} style={{ borderTop : currentTab == 'post' ? '1px solid rgba(0,0,0,0.9)' : '' }} className='tw-relative tw-top-[-13px] tw-flex tw-pt-3 tw-gap-2 tw-mt-3 tw-w-28'>
          <ImageIcon className='tw-text-[#6E6E6E]' />
          <label className='tw-text-[#6E6E6E]'>Post</label>
        </div>

        <div onClick={() => setCurrentTab('followers')} style={{ borderTop : currentTab == 'followers' ? '1px solid rgba(0,0,0,0.9)' : '' }} className='tw-relative tw-top-[-13px] tw-pt-3 tw-flex tw-gap-2 tw-mt-3 tw-w-28'>
          <ImageIcon className='tw-text-[#6E6E6E]' />
          <label className='tw-text-[#6E6E6E]'>Followers</label>
        </div>

        <div onClick={() => setCurrentTab('following')} style={{ borderTop : currentTab == 'following' ? '1px solid rgba(0,0,0,0.9)' : '' }} className='tw-relative tw-top-[-13px] tw-pt-3 tw-flex tw-gap-2 tw-mt-3 tw-w-28'>
          <ImageIcon className='tw-text-[#6E6E6E]' />
          <label className='tw-text-[#6E6E6E]'>Following</label>
        </div>


      </div>


      {currentTab == 'post' && <PostTab />}
      {currentTab == 'followers' && <FollowersTab />}
      {currentTab == 'following' && <FollowingTab />}

    </div>
  );
}

export default Profile;