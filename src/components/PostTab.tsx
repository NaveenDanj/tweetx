import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import { IPost } from '../types/Types';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PostItem from './PostItem';

function PostTab() {

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
    try{
      setLoading(true);
      const res = await PostService.fetchUserPosts(lastItem);
      setLoading(false);
          
      for(let i = 0; i < res.posts.length; i++){
        setFeedItems((prevArray) => [...prevArray , res.posts[i]]);
      }
      setLastItem(res.lastVisible);
      setLoading(false);
    }catch(_err){
      setLoading(false);

    }
  };


  return (
    <div className='tw-w-full tw-mt-3 tw-gap-1 tw-flex tw-flex-col'>
      
      {feedItems.map((_item:IPost , _index:number) => <PostItem post={_item} key={_index} /> )}

      <div onClick={loadData} className='tw-w-full tw-flex tw-justify-center tw-my-3 '>
        <button style={{ border: '1px solid rgba(0,0,0,0.5)' }} className="tw-w-[120px] tw-p-3  tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">{loading ? <AutorenewIcon className="tw-animate-spin" /> : 'Load more'}</button>
      </div>

    </div>
  );
}

export default PostTab;