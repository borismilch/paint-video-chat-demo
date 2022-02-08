import React from 'react';

import { useUploadData } from '@/hooks/.'
import { observer } from 'mobx-react-lite'
import { RoomStore, MediaStore } from '@/store/.' 
import { useEffect } from 'react';

import { SmallLoader } from '@/components/loaders'

import { IoMdClose } from '@/components/icons'
import Image from 'next/image'

const SendImage: React.FC<{file: File, idx: number}> = ({file, idx}) => {

  const {getUploadedData, dataUrl, url, loading} = useUploadData('images/' + RoomStore.roomId + "/")

  useEffect(() => {
    getUploadedData(file)
  }, [])

  useEffect(() => {
    if (url) {
      MediaStore.addImage(url)
    }
  }, [url]) 

  return (

    <div className='w-[100px] h-[100px] group relative rounded-lg drop-shadow overflow-hidden '>

      {loading && <div className='inset-0 z-10 absolute bg-black bg-opacity-40 flex items-center h-full justify-center'>

          <SmallLoader size={6} />
       
      </div>}

      {!loading && <div className='inset-0 z-10 bg-black absolute hover:opacity-100 opacity-0 bg-opacity-40 flex items-center h-full justify-center '>

        <button 
          onClick={() => MediaStore.removeImage(idx)}
          className='round_button'>

          <IoMdClose 
            className="text-xl font-medium"
          />

        </button>

      </div>}

      <div className='z-0'>
      { dataUrl && <img 
          src={dataUrl}
          className='w-full h-[100px] object-cover'
         
        />}
      </div>

      
    </div>
  )
};

export default observer(SendImage);
