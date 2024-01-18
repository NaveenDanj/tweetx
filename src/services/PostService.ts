import { DocumentData , QueryDocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, getFirestore, increment, limit, orderBy, query, startAfter, updateDoc, where } from 'firebase/firestore';
import AuthService from './AuthService';
import app from '../config/FirebaseConfig';
import { IPost, IUser } from '../types/Types';

const db = getFirestore(app);

export default {
    
  createPost : async (formData:IPost) => {
    const user = await AuthService.checkAuthState();
    if(!user) return false;
    formData.author = user.uid;
    formData.authorName = user.displayName+'';
    const colRef = collection(db , 'posts');
    await addDoc(colRef , formData);

    const userDocRef = doc(db , 'users' , user.uid);
    
    await updateDoc(userDocRef , {
      posts : increment(1)
    });
    


    return true;
  },

  fetchUserPosts: async (lastVisible:QueryDocumentSnapshot<DocumentData, DocumentData> | null) => {
    const user = await AuthService.checkAuthState();
    
    if(!user) return {
      success : false,
      posts: [],
      lastVisible : null
    };
    const q = query(collection(db , 'posts'), where('author' , '==' , user.uid) , orderBy('timestamp'), startAfter(lastVisible) , limit(10));
    const postsSnap = await getDocs(q);
    const lastVisibleItem = postsSnap.docs[postsSnap.docs.length-1];
    const posts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as IPost));
    
    return {
      success : true,
      posts: posts,
      lastVisible: lastVisibleItem
    };

  },

  fetchFeedPosts: async () => {
    const user = AuthService.getCurrentUser();

    if(!user) return {
      success : false,
      posts: [],
      lastVisible: null
    };

    const userDocRef = doc(db , 'users' , user.uid);
    const userSnap = await getDoc(userDocRef);

    if(!userSnap.exists()) return {
      success : false,
      posts: [],
      lastVisible: null
    };

    const userData = userSnap.data() as IUser;
    const followings = Object.keys(userData.following || {});

    
    const userPostsQuery = query(
      collection(db, 'posts'),
      where('author', 'in', followings),
      orderBy('timestamp', 'desc'),
    );
        
    const userPostsSnapshot = await getDocs(userPostsQuery);
    const _lastVisible = userPostsSnapshot.docs[userPostsSnapshot.docs.length-1];
    const userPosts = userPostsSnapshot.docs.map(doc => ({ ...doc.data() } as IPost));

    return {
      success : true,
      posts: userPosts,
      lastVisible: _lastVisible
    };


  }

};