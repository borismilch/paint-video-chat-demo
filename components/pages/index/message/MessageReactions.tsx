import React from 'react';
import { IReaction } from '@/models/.';

import { useState, useEffect } from 'react'
import { reaction } from 'mobx';

const MessageReactions: React.FC<{reactions: IReaction[]}> = ({reactions}) => {

  return (
    <div className='flex items-center gap-1'>
      {
        reactions?.map(reation => (
          <div 
            className='border-blue-600 border text-xs px-1 rounded-sm mt-1 bg-blue-200'
            key={reation.id}>
              
            {reation.body}


          </div>
        ))
      }
    </div>
  )
};

export default MessageReactions;
