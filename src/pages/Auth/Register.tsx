import { useState } from 'react';
import { ISignUp } from '../../types/Types';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import AuthService from '../../services/Auth/AuthService';

function Register() {
  const [error , setError] = useState('');
  const [formData , setFormData] = useState<ISignUp>({name: '' , email : '' , password : '' , confirmPassword: ''});
  const navigate = useNavigate();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if(formData.email == '' || formData.password == '' || formData.name == '' || formData.confirmPassword == '' ) {
      setError('Please fill out required fields');
      return;
    }

    if(formData.password != formData.confirmPassword) {
      setError('Password and confirm password does not match!');
      return;
    }

    const res = await AuthService.registerByEmailAndPassword(formData);

    if(!res.success){
      setError(res.error+'');
      return;
    }

    navigate('/');

  };


  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col">
        
      <div className="tw-w-full tw-mt-10 tw-mb-10">
        <button onClick={() => navigate('/auth')} style={{ border: '1px solid rgba(0,0,0,0.5)' }} className="tw-w-[220px] tw-p-3 tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">Login</button>
      </div>

      <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-py-10 tw-flex-grow">
        <h1 className="tw-text-4xl tw-font-bold">Create Account</h1>

        {error != '' && (<><Alert className='tw-mt-10' variant="outlined" severity="error">{error}</Alert></>)}

        <div className="tw-flex tw-flex-col tw-mt-16 tw-gap-8">
            
          <div className="tw-w-full tw-p-5 tw-bg-[#F9F9F9] tw-rounded-md">
            <input value={formData.name} onChange={(e) => setFormData((prevData) => ({...prevData , name: e. target.value}) )} required type="text" placeholder="Name" className="tw-bg-[#F9F9F9]" />
          </div>

          <div className="tw-w-full tw-p-5 tw-bg-[#F9F9F9] tw-rounded-md">
            <input value={formData.email} onChange={(e) => setFormData((prevData) => ({...prevData , email: e.target.value}))} required type="email" placeholder="Email" className="tw-bg-[#F9F9F9]" />
          </div>

          <div className="tw-w-full tw-p-5 tw-bg-[#F9F9F9] tw-rounded-md">
            <input value={formData.password} onChange={(e) => setFormData( (prevData) => ({...prevData , password: e.target.value}) ) } required type="password" placeholder="Password" className="tw-bg-[#F9F9F9]" />
          </div>

          <div className="tw-w-full tw-p-5 tw-bg-[#F9F9F9] tw-rounded-md">
            <input value={formData.confirmPassword} onChange={(e) => setFormData((prevData) => ({...prevData , confirmPassword : e.target.value}) )} required type="password" placeholder="Confirm Password" className="tw-bg-[#F9F9F9]" />
          </div>

          <div className="tw-w-full tw-mt-5 tw-flex tw-justify-end">
            <button type='submit' className=" tw-bg-[#FF748D] tw-shadow-lg tw-text-white tw-p-4 tw-px-16 tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">Sign up</button>
          </div>

        </div>

      </form>

    </div>
  );
}

export default Register;