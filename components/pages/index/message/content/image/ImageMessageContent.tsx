import React from 'react';
import { observer } from 'mobx-react-lite'

import { ImageWithLoader } from './'

import { ImageMessage } from '@/models/chat/Imessage';

const ViewImage: React.FC<{message: ImageMessage}> = ({message}) => {

  return (
    <div className='flex flex-wrap gap-1 mt-3  relative w-[260px] h-[130px]'>

      {
        message.body.slice(0, 4).map((image, idx) => (
          <ImageWithLoader message={message} idx={idx}  image={image} />
        ))  
      }

    </div>
  )
};

export default observer(ViewImage);
