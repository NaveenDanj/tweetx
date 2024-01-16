import { addDoc, collection, getFirestore } from 'firebase/firestore';
import AuthService from './AuthService';
import app from '../config/FirebaseConfig';
import { IPost } from '../types/Types';

const db = getFirestore(app);

export default {
    
  createPost : async (formData:IPost) => {
    const user = await AuthService.checkAuthState();
    if(!user) return false;
    formData.author = user.uid;
    const colRef = collection(db , 'posts');
    await addDoc(colRef , formData);
    return true;
  }

};