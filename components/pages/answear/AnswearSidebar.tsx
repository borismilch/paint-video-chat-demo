import React from 'react';
import { observer } from 'mobx-react-lite'

import { AnswearStore, RoomStore } from '@/store/.'
import { firestore } from '@/lib/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'

import { AnswearHeader, AnswearBody } from '.'
import IMessage from '@/models/chat/Imessage';

const AnswearSidebar = () => {

  const [message] = useDocument(doc(firestore, 'rooms', RoomStore.roomId, 'messages', AnswearStore.messageId))

  return (
    <>
    { AnswearStore.isCommenting && <div className='mobile_overlay' />}
    <div className={'flex flex-col h-full z-50 right-0 bg-white lg:relative transition-all duration-300 absolute flex-shrink-0  w-[380px] border-l border-gray-300 ' 
    }>

      <AnswearHeader />

      { message && <AnswearBody message={{...message.data(), id: message.id} as IMessage} /> }

    </div>
    </>
  )
};

export default observer(AnswearSidebar);
