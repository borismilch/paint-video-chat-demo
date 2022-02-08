
import { IMessage } from '@/models/.';
import React from 'react';

const MessageContent: React.FC<{message: IMessage}> = ({message}) => {
  return (
      <div className='flex flex-col '>
        <div className='flex items-center'>
          
         { message.adressat && 
            <div className='relative inline-block '>
             <p className='marker'>@{message.adressat}</p>

             <span className='tooltip text-placeholder tooltip-top -left-1 z-40'>
                {'For ' + message.adressat}
             </span>

           </div>
         }

          <p className='text-sm text-textColor font-medium'>{message.body}</p>
        </div>

      </div>
  )
};

export default MessageContent;
