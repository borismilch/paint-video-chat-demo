import React from 'react';

import { HiOutlineEmojiHappy, HiOutlinePlusSm, BiImage, MdOutlineAlternateEmail } from '@/components/icons/.' 
import { FaRegFileVideo } from 'react-icons/fa'
import { AiFillYoutube } from 'react-icons/ai'

import { FaMicrophone } from 'react-icons/fa';

import AppIcon from '@/components/icons'
import { observer } from 'mobx-react-lite';
import { MediaStore } from '@/store/.'

import { SendModeStore } from '@/store/.'

import { useRef } from 'react'

import { IoDocumentText } from 'react-icons/io5'

interface ChatFormProps {
  cb1?: () => void, 
  cb2?: () => void, 
  cb3?: () => void, 
  cb4?: () => void
}

const ChatFormActions: React.FC<ChatFormProps> = ({cb2, cb1, cb3, cb4}) => {

  const fileRef = useRef<HTMLInputElement>(null)

  const changeFile = () => {
    const file = fileRef?.current?.files[0]
    if (file) MediaStore.addFile(file)
  }

  const triggerInput = () => {
    fileRef?.current?.click()
  }

  const setVoiceMode = () => {
    SendModeStore.setMode('voice')
  }

  const setVideoMode = () => {
    SendModeStore.setMode('video-message')
  }

  return (
    <div className='flex items-center '>

      <AppIcon 
        Icon={<HiOutlinePlusSm className='text-textColor text-xl' />}
        tooltip={['more actions', 'tooltip-top']}
        classes='hidden md-block'
      />

      <AppIcon 
        onClick={cb2.bind(null)}
        Icon={<HiOutlineEmojiHappy className='text-textColor text-xl' />}
        classes="p-1"
       
      />

      <AppIcon 
        onClick={cb3.bind(null)}
        Icon={<MdOutlineAlternateEmail className='text-textColor text-xl' />}
        tooltip={['send for', 'tooltip-top']}
        classes="p-1"

      />

      <div 
        onClick={triggerInput.bind(null)}
      >

        <AppIcon 
          Icon={<BiImage className='text-textColor text-xl' />}
          tooltip={['send image', 'tooltip-top']}
          classes="p-1"

        />

      </div>

      
      <div 
        onClick={() => {triggerInput(); MediaStore.addVideo()}}
      >

        <AppIcon 
          Icon={<AiFillYoutube className='text-textColor text-xl' />}
          tooltip={['send Video', 'tooltip-top']}
          classes="p-1"

        />

      </div>

      <input type="file" hidden ref={fileRef} onChange={changeFile} />


      <div 
        onClick={() => {triggerInput(); MediaStore.addDocument()}}
      >

        <AppIcon 
          Icon={<IoDocumentText className='text-textColor text-lg' />}
          tooltip={['send Documents', 'tooltip-top -left-10']}
          classes="p-1"

        />

      </div>

        <AppIcon 
          
          Icon={<FaMicrophone className='text-textColor tex-lg' />}
          tooltip={['voice Message', 'tooltip-top -left-10']}
          classes="p-1"
          onClick={setVoiceMode.bind(null)}

        />
  
        <AppIcon 
          Icon={<FaRegFileVideo className='text-textColor tex-lg' />}
          tooltip={['video message', 'tooltip-top -left-10']}
          classes="p-1"
          onClick={setVideoMode.bind(null)}
        />

    </div>
  )
};

export default observer(ChatFormActions);
