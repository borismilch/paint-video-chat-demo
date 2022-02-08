import React, { ChangeEvent } from 'react';

import { MediaStore } from '@/store/.'
import dynamic from 'next/dynamic'

import { useState } from 'react'
import { useToggle } from '@/hooks/.'
import { MessageService } from 'service'

import { firestore } from '@/lib/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore'

import { ButtonGroup } from '@/components/forms';
import { ChatFormActions } from '../..';

import IUser from '@/models/types';

interface ChatFormButtonsProps {
  onChange: (val: string) => void,
  sendMessage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  value: string
}

const ChatFormButtons: React.FC<ChatFormButtonsProps> = (props) => {
  const {onChange, sendMessage, value} = props
  const [users] = useCollectionDataOnce(collection(firestore, 'users'))

  const [open, changeOpen] = useToggle(false)
  const [adressat, setAdressat] = useState<string>('')

  const EmojiPicker = dynamic(() => import('@/components/forms/emojiPicker/EmojiPicjker'))

  const addAdressat = async() => {
    const addressat = await (MessageService.getAddressat(users as IUser[]))
    setAdressat(addressat)
  }

  return (
  
    <div className='flex w-full relative justify-between'>

    {!(MediaStore.files.length > 0) && <>
      <ChatFormActions
          cb2={changeOpen.bind(null, !open)}
          cb3={addAdressat.bind(null)}
      />
      
      <div 
        className={'absolute -top-[100px] z-10 left-0 transition-all duration-300 ' + (open ? 'opacity-100 visible' : 'opacity-0 hidden')}>
        <EmojiPicker changeValue={onChange} />
      </div>
    </>}

    {MediaStore.files.length > 0 && <div></div> }

    <ButtonGroup 
      disabled={!MediaStore.isDocuments ? (MediaStore.files.length ? (MediaStore.files.length > MediaStore.images.length) : !value) : MediaStore.files.length > MediaStore.documents.length}
      onClickFirst={sendMessage.bind(null)}
      onClickSecond={() => {}}
    />

  </div>
  )
};

export default ChatFormButtons;
