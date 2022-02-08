import React from 'react';

import { ChatHeader, ChatForm, ChatMessages } from '.'
import { observer } from 'mobx-react-lite'
import { RoomStore } from '@/store/.'
import { useDocument } from 'react-firebase-hooks/firestore';

import { firestore } from '@/lib/firebase'
import { collection, doc } from 'firebase/firestore'


const Chat = () => {
  const [room, loading] = useDocument(doc(collection(firestore, 'rooms'), RoomStore.roomId))

  return (
    <div className='flex flex-col w-screen relative'>

      <ChatHeader room={{name: room?.data()?.name}} />

      <div className='flex-grow bg-[#1a1d21]'>
        { loading ? <p>Loading...</p> : (
          <ChatMessages />
        ) }
      </div>

      {!loading && 
        <div className='absolute bottom-0 w-full'>
          <ChatForm />
        </div>
      }
  
    </div>
  )
};

export default observer(Chat)
