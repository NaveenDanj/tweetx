import { useEffect, useState } from 'react';
import CreatePost from '../../Dialogs/CreatePost';
import FeedItem from '../../components/FeedItem';
import PostService from '../../services/PostService';
import { IPost } from '../../types/Types';
import { DocumentData , QueryDocumentSnapshot } from 'firebase/firestore';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Feed() {

  const [feedItems , setFeedItems] = useState<IPost[]>([]);
  const [lastItem , setLastItem] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null);
  const [loading , setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const res = await PostService.fetchUserPosts(lastItem);
      console.log(res);
      setFeedItems(res.posts);
      setLastItem(res.lastVisible);
    };

    fetchData();

  },[]);

  const loadData = async () => {
    setLoading(true);
    const res = await PostService.fetchUserPosts(lastItem);
    console.log(res);
    setLoading(false);

    for(let i = 0; i < res.posts.length; i++){
      setFeedItems((prevArray) => [...prevArray , res.posts[i]]);
    }
    setLastItem(res.lastVisible);
  };

  return (
    <div className="tw-flex tw-flex-col tw-mt-10 tw-flex-grow tw-max-w-[700px] ">
      <CreatePost />

      <div className="tw-mt-10 tw-flex tw-flex-col tw-gap-10">
        {feedItems.map((_item , index) => (<FeedItem post={_item} key={index} />) )}
      </div>

      <div className='tw-w-full tw-flex tw-justify-center tw-my-10 '>
        <button onClick={loadData} style={{ border: '1px solid rgba(0,0,0,0.5)' }} className="tw-w-[120px] tw-p-3  tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">
          {loading ? <AutorenewIcon className="tw-animate-spin" /> : 'Load more'}
        </button>
      </div>

    </div>
  );
}

export default Feed;