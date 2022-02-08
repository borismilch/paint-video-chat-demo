import React from 'react';

import { emojies } from '@/utils/mock/emojies'
import { Emoji } from '..'

const EmojiPicker: React.FC<{changeValue: (val: string) => void}> = ({changeValue}) => {
  return (
    <div className="overflow-scroll scrollbar-none bg-white grid grid-cols-5 w-[200px] h-[53px] rounded-xl border-gray-400 border-2 drop-shadow-lg">
      
      {
        emojies.map(item => (
          <Emoji 
            key={item}
            val={item}
            onClick={changeValue.bind(null, item)}
          />
        ))
      }

    </div>
  )
};

export default EmojiPicker;
