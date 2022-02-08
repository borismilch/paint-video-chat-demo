import React, { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RoomStore, AnswearStore, SendModeStore } from '@/store/.'

import { useInputValue } from '@/hooks/.'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'

import { MediaStore } from '@/store/.'
import { createMessage } from '@/utils/helpers/createMessage';

import {ChatMediaForm} from '.'

import { SendVoiceMessage, SendRecordedVideo } from './forms';
import { MessageService } from 'service';
import { ChatFormButtons } from './buttons';

const ChatForm: React.FC<{updateId?: string}> = ({updateId}) => {
 
  const [user] = useAuthState(auth)
  const [adressat, setAdressat] = useState<string>('')
  const [value, bind, cleanValue, changeValue] = useInputValue()

  const hasNoValue = !value && !MediaStore.images.length && !MediaStore.documents.length

  const sendMessage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (hasNoValue) { return }
    
    const [body, role] = MessageService.createBody(value)
    const message = createMessage(role, body, adressat, user)
    cleanValue()

    await MessageService.sendMessage(AnswearStore.messageId, RoomStore.roomId, message as any)
    MessageService.cleanStores()
    setAdressat('')

  }

  return (
    <form onSubmit={sendMessage.bind(null)}>

    <div 
      className={'message_form mb-4 items-end ' + 
      (updateId && 'bg-white ')}
      style={{
        flexDirection: MediaStore.files.length 
        ? 'row' : "column"
      }}
    >

      { !(SendModeStore.mode === 'voice') ? 
        SendModeStore.mode === 'video-message' ? 
        <SendRecordedVideo /> :
       <>
        { !(MediaStore.files.length > 0) ? 
          
          <input 
            {...bind} 
            type="text" 
            placeholder="Send a message..." 
            className = 'cleanInput text-sm h-[30px] text-white w-full mr-auto flex-grow'
          /> : <ChatMediaForm  />
        }

        <ChatFormButtons 
          value={value} 
          onChange={(val: string) => changeValue(val)} 
          sendMessage={sendMessage} 
        />

        </> : 
        <>
        <SendVoiceMessage />
        </>
      }

      </div>
    </form>
  )
};

export default observer(ChatForm);
