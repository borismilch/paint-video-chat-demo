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
  const [audioURL, isRecording, startRecording, stopRecording, url, loading, timeStamp, audio, stopped] = useRecorder();
  const [user] = useAuthState (auth)

  const cleanStore = () => {
    SendModeStore.setMode('')
  }

  const sendAudioMessage = async () => {
    const newMessage = createMessage('voice', {url, id:serverTimestamp()}, '', user)
    cleanStore()

    await MessageService.sendMessage('', RoomStore.roomId, newMessage as any)
  }

  return (
    <div 
      style={{background: 'rgb(59, 130, 246)'}}  
      className={'voiceForm ' + (isRecording && 'animate-pulse')}
    >

    <div className='relative'>
    
     { !stopped && (!isRecording ? 
       <AppIcon 
         Icon={<FaStop className='text-2xl text-white bg-blue-500 animate-pulse -left-10' />}
         tooltip={['Start', 'tooltip-top -left-1']}
         classes='p-1 bg-blue-500 hover:bg-blue-500' 
         onClick={startRecording.bind(null)}
       /> : (
        <AppIcon 
          Icon={<BsRecordCircle className='text-2xl text-white bg-blue-500 animate-pulse -left-10' />}
          tooltip={['End Recording', 'tooltip-top -left-10']}
          classes='p-1 bg-blue-500 hover:bg-blue-500' 
          onClick={stopRecording.bind(null)}
        /> 
       ))
     }

    { stopped && (
      <audio className='timeline ' controls src={audioURL}></audio>
    ) }

    </div>

    <div className='flex flex-grow w-full'>

    </div>

    {stopped  &&(

      <div className='flex items-center'>
        <button disabled={loading} className='disabled:opacity-50'>
          <AppIcon 
            Icon={<MdOutlineClose className='text-2xl ml-auto text-white bg-blue-500 animate-pulse -left-10' />}
            tooltip={['End Recording', 'tooltip-top -left-10']}
            classes='p-1 bg-blue-500 hover:bg-blue-500  ml-auto' 
            onClick={cleanStore.bind(null)}
          />
        </button> 

        <button disabled={loading} className='disabled:opacity-50'>
          <AppIcon 
            Icon={<IoIosSend className='text-2xl ml-auto text-white bg-blue-500 animate-pulse -left-10' />}
            tooltip={['End Recording', 'tooltip-top -left-10']}
            classes='p-1 bg-blue-500 hover:bg-blue-500  ml-auto' 
            onClick={sendAudioMessage.bind(null)}
          />
        </button> 

      </div>
   
   )}

    <div className='text-blue-500  p-1 px-2 rounded-full animate-pulse  text-xs font-semibold bg-white'>
     {toHHMMSS(timeStamp)}
    </div>

  </div>
  )
};

export default observer(SendvoiceMessage);
