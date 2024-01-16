import { Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FollowItem from '../../components/FollowItem';
import PostItem from '../../components/PostItem';


function Profile() {
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

        <div style={{ borderTop : '1px solid rgba(0,0,0,0.9)' }} className='tw-relative tw-top-[-13px] tw-flex tw-pt-3 tw-gap-2 tw-mt-3 tw-w-28'>
          <ImageIcon className='tw-text-[#6E6E6E]' />
          <label className='tw-text-[#6E6E6E]'>Post</label>
        </div>

        <div className='tw-relative tw-top-[-13px] tw-pt-3 tw-flex tw-gap-2 tw-mt-3 tw-w-28'>
          <ImageIcon className='tw-text-[#6E6E6E]' />
          <label className='tw-text-[#6E6E6E]'>Followers</label>
        </div>

        <div className='tw-relative tw-top-[-13px] tw-pt-3 tw-flex tw-gap-2 tw-mt-3 tw-w-28'>
          <ImageIcon className='tw-text-[#6E6E6E]' />
          <label className='tw-text-[#6E6E6E]'>Following</label>
        </div>


      </div>

      {/* <div className='tw-w-full tw-mt-12 tw-gap-10 tw-flex tw-flex-col'>
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <FollowItem />
      </div> */}

      <div className='tw-w-full tw-mt-3 tw-gap-1 tw-flex tw-flex-col'>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />

        <div className='tw-w-full tw-flex tw-justify-center'>
          <button style={{ border: '1px solid rgba(0,0,0,0.5)' }} className="tw-w-[120px] tw-p-3  tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">Load more</button>
        </div>

      </div>

    </div>
  );
}

export default Profile;