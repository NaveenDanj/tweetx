import { useEffect, useState } from 'react';
import CreatePost from '../../Dialogs/CreatePost';
import FeedItem from '../../components/FeedItem';
import PostService from '../../services/PostService';
import { IPost } from '../../types/Types';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Feed() {

  const [feedItems , setFeedItems] = useState<IPost[]>([]);
  const [loading , setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      const res = await PostService.fetchFeedPosts();
      console.log(res);
      setFeedItems(res.posts);
      setLoading(false);
    };

    fetchData();

  },[]);


  return (
    <div className="tw-flex tw-flex-col tw-mt-10 tw-flex-grow tw-max-w-[700px] ">
      <CreatePost />

      {loading ? (
        <div className='tw-w-full tw-mt-16 tw-flex tw-justify-center'>
          <AutorenewIcon className="tw-animate-spin" />
        </div>
      ) : ''}

      <div className="tw-mt-10 tw-flex tw-flex-col tw-gap-10">
        {feedItems.map((_item , index) => (<FeedItem post={_item} key={index} />) )}
      </div>

    </div>
  );
}

export default Feed;