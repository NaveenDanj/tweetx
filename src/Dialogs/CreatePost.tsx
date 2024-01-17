import { Alert, Dialog } from '@mui/material';
import React from 'react';
import PostService from '../services/PostService';
import { IPost } from '../types/Types';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function CreatePost() {

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [content , setContent] = React.useState('');
  const [loading , setLoading] = React.useState(false);

  const handleClose = () => {
    setContent('');
    setError('');
    setLoading(false);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setError('');
    setOpen(true);
  };

  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(loading){
      return;
    }

    if(!content) {
      setError('Please fill out required fields!');
      return;
    }

    const formData:IPost = {
      content: content,
      timestamp: new Date(),
      author: '',
      authorName: ''
    };

    try{
      setLoading(true);
      await PostService.createPost(formData);
    }catch(err){
      setError('Something went wrong. Please try again.');
    }finally{
      setLoading(false);
      handleClose();
    }

  };

  return (
    <div>

      <button onClick={handleClickOpen} className=" tw-bg-[#FF748D] tw-shadow-lg tw-text-white tw-w-[150px] tw-p-4 tw-px-12 tw-rounded-[11px] tw-font-bold tw-flex tw-justify-center">Write</button>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '500px',
            },
          },
        }}
      >

        <div className='tw-flex tw-w-full tw-h-full'>

          <div className='tw-flex tw-flex-grow tw-p-3 tw-overflow-y-auto'>

            <form onSubmit={handleSubmit} className='tw-w-full tw-pb-5'>

              <div className='tw-p-2'>

                <h1 className='tw-text-xl tw-font-bold'>Create Post</h1>
                
                <p className='tw-text-xs tw-text-[#A4A4A4] tw-mt-2  '>
                    Share your thoughts, updates, or anything you'd like with the TweetX community!
                </p>

                {error != '' && (<><Alert variant="outlined" className='tw-mt-6' severity="error">{error}</Alert></>)}

                <div className="tw-w-full tw-p-5 tw-mt-6 tw-bg-[#F9F9F9] tw-rounded-md">
                  <textarea maxLength={150} onChange={(e) => setContent(e.target.value)} value={content} required placeholder="What's on your mind..." className="tw-bg-[#F9F9F9] tw-w-full tw-p-2" />
                </div>

              </div>

              <div className='tw-mt-5 tw-w-[95%] tw-ml-5 tw-flex tw-justify-end tw-gap-1'>
                <button className=" tw-bg-[#FF748D] tw-shadow-lg tw-text-white tw-w-[150px] tw-p-3 tw-px-5 tw-rounded-[11px] tw-font-bold tw-flex tw-justify-center">
                  {loading ? <AutorenewIcon className="tw-animate-spin" /> : 'Post'}
                </button>
              </div>

            </form >

          </div>

        </div>

      </Dialog>
    </div>
  );
}

export default CreatePost;