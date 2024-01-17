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
        ...followerDoc.followers,
        [user.uid] : true
      }
    });
    
    const currentUserRef = doc(db , 'users' , user.uid);
    const currentUserSnap = await getDoc(currentUserRef);

    if(!currentUserSnap.exists()) return false;

    const followingSnap = currentUserSnap.data() as IUser;

    await updateDoc(currentUserRef , {
      following: {
        ...followingSnap.following,
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

  },

  getUserFollowers: async (uid:string ) => {

    const docRef = doc(db , 'users' , uid);
    const userSnap = await getDoc(docRef);

    if(!userSnap.exists()) return {
      success : false,
      followers: []
    };

    const userDoc = userSnap.data() as IUser;
    const followerList = Object.keys(userDoc.followers);
    const followers:IUser[] = [];


    for(let i = 0; i < followerList.length; i++){
      const followerRef = doc(db , 'users' , followerList[i]);
      const followerSnap = await getDoc(followerRef);
      if(!followerSnap.exists()) continue;
      followers.push(followerSnap.data() as IUser);
    }

    return {
      success : true,
      followers: followers
    };

  },

  getUserFollowing: async (uid:string ) => {

    const docRef = doc(db , 'users' , uid);
    const userSnap = await getDoc(docRef);

    if(!userSnap.exists()) return {
      success : false,
      following: []
    };

    const userDoc = userSnap.data() as IUser;
    const followingList = Object.keys(userDoc.following);
    const following:IUser[] = [];


    for(let i = 0; i < followingList.length; i++){
      const followingRef = doc(db , 'users' , followingList[i]);
      const followingSnap = await getDoc(followingRef);
      if(!followingSnap.exists()) continue;
      following.push(followingSnap.data() as IUser);
    }

    return {
      success : true,
      following: following
    };

  }

};