
function Login() {
  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col">
        
      <div className="tw-w-full tw-mt-10 tw-mb-10">
        <button style={{ border: '1px solid rgba(0,0,0,0.5)' }} className="tw-w-[220px] tw-p-3 tw-rounded-[15px] tw-font-bold tw-flex tw-justify-center">Create Account</button>
      </div>

      <div className="tw-flex tw-flex-col tw-py-10 tw-flex-grow">
        <h1 className="tw-text-4xl tw-font-bold">Login</h1>

        <div className="tw-flex tw-flex-col tw-mt-16 tw-gap-8">
            
          <div className="tw-w-full tw-p-5 tw-bg-[#F9F9F9] tw-rounded-md">
            <input type="email" placeholder="Email" className="tw-bg-[#F9F9F9]" />
          </div>

          <div className="tw-w-full tw-p-5 tw-bg-[#F9F9F9] tw-rounded-md">
            <input type="password" placeholder="Password" className="tw-bg-[#F9F9F9]" />
          </div>

          <div className="tw-w-full tw-mt-5 tw-flex tw-justify-between">
            <label className="tw-my-auto tw-font-semibold tw-cursor-pointer">Forgot Password</label>
            <button className=" tw-bg-[#FF748D] tw-text-white  tw-p-4 tw-px-12 tw-rounded-[11px] tw-font-bold tw-flex tw-justify-center">Login</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;