import { User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../config/FirebaseConfig';
import { ISignIn, ISignUp, IUser } from '../types/Types';
import { DocumentData, QueryDocumentSnapshot, collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, startAfter, where } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

export default {
  login : async (form:ISignIn) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
    
      return {
        'success' : true,
        'user' : userCredential.user,
        'error' : ''
      };
            
    }catch(err){
      return {
        'success' : false,
        'user' : null,
        'error' : err
      };
    }
  },

  registerByEmailAndPassword : async (formData: ISignUp) => {
    try{
      const user = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      if(!auth.currentUser) return {
        'success' : false,
        'error' : 'Registration failed',
        'user': null,
      };

      await updateProfile(auth.currentUser , {
        displayName : formData.name
      });

      const docRef = doc(db , 'users' , auth.currentUser.uid);

      await setDoc(docRef , {
        id: auth.currentUser.uid,
        displayName : formData.name,
        email: formData.email,
        followers: {},
        following: {},
        posts: 0,
        timestamp : new Date()
      } as IUser);
            
      return {
        'success' : true,
        'user' : user.user,
        'error' : ''
      };

    }catch(err){

      return {
        'success' : false,
        'error' : err,
        'user': null,
      };
        
    }
  },

  checkAuthState : ():Promise<User | null> => {
    return new Promise( (resolve , reject ) => {
      onAuthStateChanged(auth, user => {
        if (user) {
          resolve(user);
        }else{
          reject(null);
        }
      });
    });
  },

  getUserList: async (lastVisible:QueryDocumentSnapshot<DocumentData, DocumentData> | null) => {
    const q = query(collection(db , 'users') , where('id' , '!=' , auth.currentUser?.uid) , orderBy('id') , startAfter(lastVisible) , limit(10));
    const usersSnap = await getDocs(q);
    const lastVisibleItem = usersSnap.docs[usersSnap.docs.length-1];
    const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as IUser));
    return {
      users,
      lastVisibleItem
    };
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },

  getCurrentUserAdditionalData: async () => {
    if(!auth.currentUser) return null;

    const docRef = doc(db , 'users' , auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if(!docSnap.data()) return null;

    return docSnap.data() as IUser;

  }

};