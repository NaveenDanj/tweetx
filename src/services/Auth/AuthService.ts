import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../config/FirebaseConfig';
import { ISignIn } from '../../types/Types';

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
};