import { useEffect, useState } from 'react';
import ProfileItem from './ProfileItem';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AuthService from '../services/AuthService';
import { IUser } from '../types/Types';
import ProfileService from '../services/ProfileService';

function FollowersTab() {

  const [loading , setLoading] = useState(false);
  const [users , setUsers] = useState<IUser[]>([]);

  useEffect(() => {

    const user = AuthService.getCurrentUser();
    if(!user) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await ProfileService.getUserFollowers(user.uid);
      setLoading(false);
      console.log('follower => ' , res);
      if(res.success) setUsers(res.followers);
    };

    fetchData();

  },[]);

  return (
    <div className='tw-w-full tw-mt-3 tw-gap-1 tw-flex tw-flex-col'>
      {loading && (
        <div className='tw-mt-5 tw-w-full tw-flex tw-justify-center'>
          <AutorenewIcon className="tw-animate-spin" />
        </div>
      ) }
      {users.map( (user:IUser) => <ProfileItem key={user.id} user={user} /> )}
    </div>
  );
}

export default FollowersTab;