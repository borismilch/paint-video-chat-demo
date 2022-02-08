import React from 'react';
import { observer } from 'mobx-react-lite'

import { RoomStore, AnswearStore } from '@/store/.'
import { firestore } from '@/lib/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore'

import Image from 'next/image'

const MessageAnswears: React.FC<{messageId: string}> = ({messageId}) => {

  const [answears] = useCollectionData(collection(firestore, 'rooms', RoomStore.roomId, 'messages', messageId, 'answears'))

  return (
    <>
    
    { answears?.length > 0 &&  <div className='flex items-center gap-1 py-2'>
        <div className='small_avatar'>

          <Image 
            src={answears[0].userImage}
            layout='fill'
            objectFit='cover'
            alt='ddddd'
          />

        </div>

        <p 
          onClick={() => AnswearStore.commentMessage(messageId)}
          className='answear_link'
        >{answears.length} answears</p>
      </div>}

    </>
  )
};

export default observer(MessageAnswears);
