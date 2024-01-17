import { Avatar } from '@mui/material';
import { IPost } from '../types/Types';
import UtilService from '../services/UtilService';

interface IFeedProp {
  post: IPost
}


function FeedItem({post}: IFeedProp) {

  return (
    <div style={{ border : '1px solid rgba(0,0,0,0.1)' }} className="tw-bg-#FFFFFF] tw-shadow-lg tw-p-10 tw-rounded-xl">
        
      <div className='tw-w-full tw-flex tw-justify-between tw-gap-5'>

        <div>
          <Avatar sx={{ width : 50 , height : 50 }} />
        </div>

        <div className='tw-flex tw-flex-col tw-gap-3 tw-flex-grow'>
                
          <div className='tw-w-full tw-flex tw-justify-between'>
            <label className='tw-text-xl tw-my-auto'>{post.authorName}</label>
            <label className='tw-text-xs tw-my-auto tw-text-[#C6C6C6]'>{UtilService.formatDateDisplay(post.timestamp)}</label>
          </div>

          <div className='p-4'>
            <label className='tw-text-[#C6C6C6]'>{post.content}</label>
          </div>

        </div>

      </div>

    </div>
  );
}

export default FeedItem;