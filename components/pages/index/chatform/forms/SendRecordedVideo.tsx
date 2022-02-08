import React from 'react';

import { useRecorder } from '@/hooks/.'
import AppIcon from '@/components/icons/AppIcon';
import { FaStop } from 'react-icons/fa'
import { BsRecordCircle } from 'react-icons/bs';
import { IoIosSend } from 'react-icons/io';

import { createMessage } from '@/utils/helpers/createMessage';
import { serverTimestamp } from 'firebase/firestore'

import { MessageService } from 'service'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { RoomStore } from '@/store/.'
import { observer } from 'mobx-react-lite';
import { toHHMMSS } from '@/utils/helpers/tohhmmss';

import { MdOutlineClose } from 'react-icons/md'
import { SendModeStore } from '@/store/.'

const SendvoiceMessage = () => {
  const [videoUrl, isRecording, startRecording, stopRecording, url, loading, timeStamp, audio, stopped] = useRecorder(true);
  const [user] = useAuthState (auth)

  const cleanStore = () => {
    SendModeStore.setMode('')
  }

  const sendVideoMessage = async () => {
    const newMessage = createMessage('video', {url, id:serverTimestamp()}, '', user)
    cleanStore()
    await MessageService.sendMessage('', RoomStore.roomId, newMessage as any)
  
  }

  return (
    <>
     { stopped && <video src={videoUrl} controls className='w-[200px] mx-auto my-4 rounded-md  h-[200px]'></video>}
    <div 
      className={'voiceForm bg-red-500 hover:bg-red-500 ' + (isRecording && 'animate-pulse')}
    >

    <div className='relative'>
    
     { !stopped && (!isRecording ? 
       <AppIcon 
         Icon={<FaStop className='text-2xl text-white bg-red-500 animate-pulse -left-10' />}
         tooltip={['Start', 'tooltip-top -left-1']}
         classes='p-1 bg-red-500 hover:bg-red-500' 
         onClick={startRecording.bind(null)}
       /> : (
        <AppIcon 
          Icon={<BsRecordCircle className='text-2xl text-white bg-red-500 animate-pulse -left-10' />}
          tooltip={['End Recording', 'tooltip-top -left-10']}
          classes='p-1 bg-red-500 hover:bg-red-500' 
          onClick={stopRecording.bind(null)}
        /> 
       ))
     }

    </div>

    <div className='flex flex-grow w-full'>

    </div>

    {stopped  &&(

      <div className='flex items-center'>
        <button disabled={loading} className='disabled:opacity-50'>
          <AppIcon 
            Icon={<MdOutlineClose className='text-2xl ml-auto text-white bg-red-500 animate-pulse -left-10' />}
            tooltip={['End Recording', 'tooltip-top -left-10']}
            classes='p-1 bg-red-500 hover:bg-red-500  ml-auto' 
            onClick={cleanStore.bind(null)}
          />
        </button> 

        <button disabled={loading} className='disabled:opacity-50'>
          <AppIcon 
            Icon={<IoIosSend className='text-2xl ml-auto text-white bg-red-500 animate-pulse -left-10' />}
            tooltip={['End Recording', 'tooltip-top -left-10']}
            classes='p-1 bg-red-500 hover:bg-red-500  ml-auto' 
            onClick={sendVideoMessage.bind(null)}
          />
        </button> 

      </div>
   
   )}

    <div className='text-red-500  p-1 px-2 rounded-full animate-pulse  text-xs font-semibold bg-white'>
     {toHHMMSS(timeStamp)}
    </div>

  </div>

  </>
  )
};

export default observer(SendvoiceMessage);
