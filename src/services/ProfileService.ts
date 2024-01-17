import { User } from 'firebase/auth';
import app from '../config/FirebaseConfig';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import AuthService from './AuthService';
import { IUser } from '../types/Types';

const db = getFirestore(app);

export default {
    
  followUser : async (uid:string) => {
    const user:User | null = await AuthService.checkAuthState();

    if(!user) return false;

    const docRef = doc(db , 'users' , uid);
    const userSnap = await getDoc(docRef);

    if(!userSnap.exists()) return false;

    const followerDoc = userSnap.data() as IUser;

    if(followerDoc.followers[user.uid]) return false;
    
    await updateDoc(docRef , {
      followers: {
        [user.uid] : true
      }
    });
    
    const currentUserRef = doc(db , 'users' , user.uid);
    const currentUserSnap = await getDoc(currentUserRef);

    if(!currentUserSnap.exists()) return false;

    await updateDoc(currentUserRef , {
      following: {
        [uid] : true
      }
    });

    return true;

  },

  unFollowUser: async (uid:string) => {
    const user = AuthService.getCurrentUser();
    if(!user) return false;

    const docRef = doc(db , 'users' , uid);
    const userSnap = await getDoc(docRef);

    if(!userSnap.exists()) return false;

    const followerDoc = userSnap.data() as IUser;

    if(!followerDoc.followers[user.uid]) return false;

    const updatedFollowers = { ...followerDoc.followers };
    delete updatedFollowers[user.uid];

    await updateDoc(docRef , {
      followers: updatedFollowers
    });


    const currentUserRef = doc(db , 'users' , user.uid);
    const currentUserSnap = await getDoc(currentUserRef);

    if(!currentUserSnap.exists()) return false;

    const currentUserDoc = currentUserSnap.data() as IUser;

    const updatedFollowings = { ...currentUserDoc.following };
    delete updatedFollowings[uid];

    await updateDoc(currentUserRef , {
      following: updatedFollowings
    });

    return true;

  }



};