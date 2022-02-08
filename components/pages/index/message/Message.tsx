import React from 'react';
import Image from 'next/image'

import { IMessage, IReaction } from '@/models/.'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'

import { MessageIcons, MessageReactions, MessageAnswears } from '..'
import { useCollection } from 'react-firebase-hooks/firestore'

import { firestore } from '@/lib/firebase'
import { collection } from 'firebase/firestore'

import { observer } from 'mobx-react-lite'

import { RoomStore } from '@/store/.'
import { TextMessageContent, MessageHeader, ImageMessageContent, VideoMessageContent , DocumentMessageContent, VoiceMessageContent} from './content';

const Message: React.FC<{message: IMessage, showAnswears?: boolean, isAnswear?: boolean}> = 
  ({message, showAnswears = true, isAnswear = false}) => {

  const [reactions] = useCollection(collection(
    firestore, 'rooms', RoomStore.roomId, 'messages', message.id, 'reactions'
  ))

  const [user] = useAuthState(auth)

  return (
    <div className={'message bg-main rounded-md mb-3 relative group  mx-0 ' + (user?.uid === message.userId && ' mx-3 ')}>

      <div className='avatar hidden rounded md:flex'>
        <Image 
          src={message.userImage}
          layout='fill'
          objectFit={'cover'}
        />
        
      </div>

      <div className='flex flex-col '>

        <div className='flex flex-col'>

          <MessageHeader message={message} />

          { message.role === 'text' ? 
           (<TextMessageContent message={message} />) : 
          
           message.role === 'video' ?
           (<VideoMessageContent message={message as any} />) :

           message.role === 'document' ? 
           ( <DocumentMessageContent message={message as any} /> ) :

           message.role === "voice" ?

            (<VoiceMessageContent message={message as any} />) :

           (<ImageMessageContent message={message as any} />) 
          }

        </div>

        <MessageReactions reactions={reactions?.docs?.map(item => ({ ...item.data(), id: item.id })) as IReaction[]} />

        { showAnswears && <MessageAnswears messageId={message.id} /> }

      </div>

      

     { !isAnswear && <div className='message_toolbar'>

        <MessageIcons message = {message}  reactions={reactions?.docs?.map(item => ({ ...item.data(), id: item.id })) as IReaction[]} />

      </div>}

    </div>
  )
};

export default observer(Message);
