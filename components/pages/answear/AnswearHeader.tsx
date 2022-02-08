import React from 'react';
import { observer } from 'mobx-react-lite'

import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { RoomStore, AnswearStore } from '@/store/index'

import { firestore } from '@/lib/firebase'
import { doc } from 'firebase/firestore'

import AppIcon, { MdOutlineClose } from '@/components/icons'

const AswearHeader = () => {

  const [room] = useDocumentDataOnce(doc(firestore, 'rooms', RoomStore.roomId))

  return (
    <div className='flex items-center gap-2 p-3 border-b border-gray-400'>

      <h3 className='text-xl font-bold'>
      Обсуждение
      </h3>

      <p className='flex-grow'>#{room?.name}</p>

      <div onClick={() => AnswearStore.cleanMessageComment()}>

        <AppIcon 
          Icon={<MdOutlineClose className='text-xl text-gray-600'/>}
          classes='rounded-md'
          tooltip={['Close', 'tooltip-bottom -left-1']}  
        />

      </div>

    </div>
  )
};

export default observer(AswearHeader);
