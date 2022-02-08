import React, { useEffect } from 'react';
import AppIcon, {BsFillChatRightTextFill, MdOutlineAddReaction} from '@/components/icons'

import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { firestore, auth } from '@/lib/firebase'

import { observer } from 'mobx-react-lite'
import { useAuthState } from 'react-firebase-hooks/auth';
import { IConItem, IReaction } from '@/models/.';

import { MdDelete } from 'react-icons/md'
import { FaPen } from 'react-icons/fa'
import { RoomStore, AnswearStore } from '@/store/.' 
import dynamic from 'next/dynamic'

import { useInputValue, useToggle } from '@/hooks/.'
import IMessage from '@/models/chat/Imessage'

import { MessageService } from 'service'

const MessageIcons: React.FC<{message: IMessage, reactions: IReaction[] }> = ({message, reactions}) => {
  const [user] = useAuthState(auth)

  const [value, bind, clean, changeValue] = useInputValue()
  const [open, changeOpen] = useToggle(false)
  const [openMune, setOpenMenu] = useToggle(false)

  const EmojiPicher = dynamic(() => import('@/components/forms/emojiPicker/EmojiPicjker'))

  const deleteMessage = async() => {
    await MessageService.deleteItem(message.id)
  }  
  
  const updateMessage = async () => {
    await MessageService.updateItem(message.id)
  }

  const dropItem:IConItem[] = [
    {Icon: <MdDelete className='text-textColor' />, id: '12', onClick: deleteMessage.bind(null) },
    {Icon: <FaPen className='text-textColor text-sm' />, id: '1ll2', onClick: updateMessage.bind(null) }
  ]


  const addReaction = async (react: string) => {
    const reaction = {
      body: react,
      userId: user.uid,
    }

    const exsistReaction = reactions.find(item => item.body === react && item.userId === user.uid)

    if (exsistReaction) {
      await deleteDoc(doc(firestore, 'rooms', RoomStore.roomId, 'messages', message.id, 'reactions', exsistReaction.id))
    }

    else {
      await addDoc(collection(firestore, 'rooms', RoomStore.roomId, 'messages', message.id, 'reactions'), reaction)
    }

  }

  useEffect(() => {
    if (value) {
      addReaction(value[value.length - 1])
    }
  }, [value])

  return (
    <div className="flex bg-darken z-50 relative drop-shadow-md rounded-full items-center p-1">

      <AppIcon 
        Icon={ <p className="text-lg">✨</p> }
        classes='p-1'
        onClick={() => addReaction('✨')}
      />

      <AppIcon 
        Icon={ <p className="text-lg">✔</p> }
        classes='p-1'
        onClick={() => addReaction('✔')}
      />

      <AppIcon 
        Icon={<MdOutlineAddReaction className='text-lg text-textColor'  />}
        classes='text-xs p-1'
        onClick={changeOpen.bind(null, !open)}
        
      />


      {open && <div className={'absolute transform translate-x-14 translate-y-14 lg:translate-y-0 lg:-translate-x-56 transition-all duration-300 '}>
        <EmojiPicher 
          changeValue={changeValue}
        />
      </div>}

      <div onClick={() => AnswearStore.commentMessage(message.id)}>
        <AppIcon 
          Icon={<BsFillChatRightTextFill className='text-sm text-gray-500'  />}
          classes='text-xs p-1'
        />
      </div>

      
      { user.uid === message.userId && <>
        <div className='relative flex items-center'>

          <AppIcon 
            Icon={dropItem[0].Icon}
            onClick={dropItem[0].onClick}
          />

          {message.role === 'text' && <AppIcon 
            Icon={dropItem[1].Icon}
            onClick={dropItem[1].onClick}
          />}

        </div>
      </>}

    </div>
  )
};

export default observer(MessageIcons);
