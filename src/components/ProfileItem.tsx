import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { IUser } from '../types/Types';
import ProfileService from '../services/ProfileService';
import UtilService from '../services/UtilService';

interface IUserItemProp {
  user: IUser
}

function ProfileItem({user}:IUserItemProp) {

  const [isFollow , setIsFollow] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if(!currentUser){
      return;
    }

    if(user.followers[currentUser.uid]){
      setIsFollow(true);
    }else{
      setIsFollow(false);
    }

  }, []);


  const handleFollow = async () => {
    const res = await ProfileService.followUser(user.id);
    if(res) setIsFollow(true);
  };

  const handleUnFollow = async () => {
    const res = await ProfileService.unFollowUser(user.id);
    if(res) setIsFollow(false);
  };


  return (
    <div className='tw-p-5 tw-flex tw-w-full tw-justify-between'>

      <div className='tw-flex tw-gap-5 tw-my-auto'>
        <Avatar sx={{ width : 50 , height : 50 }} />

        <div className='tw-w-full tw-flex tw-flex-col tw-justify-between'>
          <label className='tw-text-xl tw-my-auto'>{user.displayName}</label>
          <label className='tw-text-xs tw-my-auto tw-text-[#C6C6C6]'>Following : {UtilService.getUserFollowersCount(user)}</label>
        </div>

      </div>

      {isFollow ? (
        <button onClick={handleUnFollow} className="tw-my-auto tw-text-black tw-w-[100px] tw-p-2 tw-items-center tw-px-5 tw-rounded-[11px] tw-font-semibold tw-flex tw-justify-center">Following</button>
      ) : (
        <button onClick={handleFollow} className="tw-my-auto tw-bg-[#FF748D] tw-shadow-lg tw-text-white tw-w-[100px] tw-p-2 tw-items-center tw-px-5 tw-rounded-[11px] tw-font-bold tw-flex tw-justify-center">Follow</button>
      ) }
      
    </div>
  );
}

export default ProfileItem;