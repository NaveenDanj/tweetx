import { User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../config/FirebaseConfig';
import { ISignIn, ISignUp } from '../types/Types';

const auth = getAuth(app);

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

};