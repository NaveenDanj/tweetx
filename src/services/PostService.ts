import { DocumentData , QueryDocumentSnapshot, addDoc, collection, getDocs, getFirestore, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import AuthService from './AuthService';
import app from '../config/FirebaseConfig';
import { IPost } from '../types/Types';

const db = getFirestore(app);

export default {
    
  createPost : async (formData:IPost) => {
    const user = await AuthService.checkAuthState();
    if(!user) return false;
    formData.author = user.uid;
    formData.authorName = user.displayName+'';
    const colRef = collection(db , 'posts');
    await addDoc(colRef , formData);
    return true;
  },

  fetchUserPosts: async (lastVisible:QueryDocumentSnapshot<DocumentData, DocumentData> | null) => {
    const user = await AuthService.checkAuthState();
    
    if(!user) return {
      success : false,
      posts: [],
      lastVisible : null
    };
    const q = query(collection(db , 'posts'), where('author' , '==' , user.uid) , orderBy('timestamp'), startAfter(lastVisible) , limit(2));
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
    
  }

};