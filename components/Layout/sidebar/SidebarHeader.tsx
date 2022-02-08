import React from 'react';

import {BiChevronDown} from 'react-icons/bi'
import { HiPencilAlt } from 'react-icons/hi'

import { firestore } from '@/lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'


import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'
import { observer } from 'mobx-react-lite'

const SidebarHeader = () => {

  const [rooms] = useCollection(collection(firestore, 'rooms'))

  const [user] = useAuthState(auth)

  const sendMessegaDiractly = async () => {
    const room = prompt('where you would like to send message?')

    const isExist = rooms.docs.find(item => item.data().name === room)

    if (!isExist) {
      alert('No rooms found')
      return 
    } 

    const value = prompt('Write a message')

    const message = {
      createdAt: serverTimestamp(),
      body: value,
      userImage: user?.photoURL,
      username: user?.displayName,
      role: 'text',
      userId: user?.uid
    }

    const messageRef = collection(firestore, 'rooms', isExist.id, 'messages')
    await addDoc(messageRef, message)
    
  }

  return (
    <div className='flex items-center gap-2 pt-2 p-3 border-border border-opacity-20 border-t border-b'>

      <h1 className="text-xl truncate text-white font-bold">
        Новое рабочее пространство
      </h1>

      <BiChevronDown className="text-textColor text-3xl" />

      <div 
        onClick={sendMessegaDiractly.bind(null)}
        className="rounded-full cursor-pointer active:scale-90 transition-all duration-200 hover:bg-gray-100 drop-shadow-sm flex-shrink-0 bg-white avatar flex items-center justify-center">

        <HiPencilAlt />

      </div>

    </div>
  )
};

export default observer(SidebarHeader);
