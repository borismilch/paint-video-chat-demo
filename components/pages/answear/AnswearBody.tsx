import {IMessage} from '@/models/.';
import React from 'react';

import { ChatForm, Message } from '../index';

import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/lib/firebase'
import { collection } from 'firebase/firestore'

import {observer} from 'mobx-react-lite'
import { RoomStore } from '@/store/.'

const AswearBody: React.FC<{message: IMessage}> = ({message}) => {

  const [asnwears] = useCollection(collection(firestore, 'rooms', RoomStore.roomId, 'messages', message.id, 'answears'))

  return (
    <div className='flex flex-col'>

      <div className='border-bray-400 mb-2 border-b'>
        <Message showAnswears={false} message={message} />
      </div>

      <div className='flex flex-col mx-3'>

        {
          asnwears?.docs.map(doc => (
            <Message key={doc.data().id} isAnswear showAnswears={false} message={{...doc.data(), id: doc.id} as IMessage} />
          ))
        }

      </div>

      <ChatForm updateId={message.id} />
      
    </div>
  )
};

export default observer(AswearBody);
