import React from 'react';
import Image from 'next/image'

import { FaMeetup } from 'react-icons/fa';

const ChatPlaceholder = () => {
  return (
    <div className=' h-full flex items-center justify-center bg-darken w-screen'>

      <div className="flex bg- flex-col shadow-md p-8 w-full mb-[40px] max-w-[400px]">

        <div className='flex flex-col items-center justify-center gap-3'>
          <FaMeetup className='text-[200px] leading-3 text-white' />

           <h1 className='text-2xl text-white font-bold'>Welcome!</h1>

          <button
            className='google_button bg-[#212121] shadow-[#212121] shadow-md hover:bg-[#181818] hover:shadow-[#181818]' 
          >
              Start new Meeting  </button>

          </div>
        </div>

    </div>

    

  )
};

export default ChatPlaceholder;
