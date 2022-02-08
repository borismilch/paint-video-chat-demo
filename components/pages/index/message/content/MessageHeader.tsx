import { dayts } from '@/lib/dayts';
import React from 'react';
import { IMessage } from '@/models/.'

import Image from 'next/image'

const MessageHeader: React.FC<{message: IMessage}> = ({message}) => {
  return (
    <div className='flex  gap-1 pb-2'>

      <div className='avatar flex rounded md:hidden'>
        <Image 
          src={message.userImage}
          layout='fill'
          objectFit={'cover'}
        />
        
      </div>

      <div className='flex items-center gap-2 py-1'>

      <p className='text-xs font-semibold text-textColor'>{message.username}</p>

      <p className={'text-xs ' + 'text-placeholder' }>
      {dayts((message?.createdAt?.seconds * 1000) || Date.now()).fromNow()}</p>
      
      </div>
   </div> 
  )
};

export default MessageHeader;
