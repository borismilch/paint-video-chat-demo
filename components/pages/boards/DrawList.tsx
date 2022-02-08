import React from 'react';

import { firestore } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'

import { IBoard } from '@/models/.';
import dynamic from 'next/dynamic';

const Drawsist = () => {

  const boardsRef = collection(firestore, 'boards')
  const [boards] = useCollection(boardsRef)

  const DrawCard = dynamic(() => import('./DrawCard'))
  const AddDraw = dynamic(() => import('./AddDraw'))

  return (
    <div className='grid grid-cols-5 gap-4 p-6 grid-rows-3 w-full h-full bg-main'>

      <AddDraw />

      {
        boards?.docs.map(item => (
          <DrawCard key={item.id} board={{...item.data(), id: item.id} as IBoard} />
        ))
      }

    </div>
  )
};

export default Drawsist;
