import { useEffect, useState } from 'react';
import UserItem from '../../components/UserItem';
import { IUser } from '../../types/Types';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import AuthService from '../../services/AuthService';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Users() {

  const [userList , setUserList] = useState<IUser[]>([]);
  const [lastItem , setLastItem] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null);
  const [loading , setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const res = await AuthService.getUserList(lastItem);
      console.log(res);
      setUserList(res.users);
      setLastItem(res.lastVisibleItem);
    };

    fetchData();

  },[]);

  const loadData = async () => {
    setLoading(true);
    const res = await AuthService.getUserList(lastItem);
    setLoading(false);

    for(let i = 0; i < res.users.length; i++){
      setUserList((prevArray) => [...prevArray , res.users[i]]);
    }
    setLastItem(res.lastVisibleItem);
  };



  return (
    <div className="tw-flex tw-flex-col tw-mt-10 tw-flex-grow tw-max-w-[700px] ">

      <div className="tw-mt-10 tw-flex tw-flex-col tw-gap-10">
        {userList.map((user:IUser) => <UserItem user={user} key={user.id} />)}

      </div>

      <div className='tw-w-full tw-flex tw-justify-center tw-my-10 '>
        <button onClick={loadData} style={{ border: '1px solid rgba(0,0,0,0.5)' }} className="tw-w-[120px] tw-p-3  tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">
          {loading ? <AutorenewIcon className="tw-animate-spin" /> : 'Load more'}
        </button>
      </div>

    </div>
  );
}

export default Users;