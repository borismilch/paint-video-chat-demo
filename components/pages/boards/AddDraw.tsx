import React from 'react';

import { BsPlusLg } from 'react-icons/bs'
import AppIcon from '@/components/icons/AppIcon';

import { BoardService } from 'service'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

const AddDraw = () => {
  const [user] = useAuthState(auth)

  const addNewBoard = async () => {
    await BoardService.addDrawBoard(user)
  }

  return (
    <div 
      onClick={addNewBoard.bind(null)}
      className='addItem drop-shadow-lg shadow-light'
    >

      <AppIcon 
        Icon={<BsPlusLg className="text-5xl text-textColor" />}
        classes="p-4"
       
      />
      
    </div>
  )
};

export default AddDraw;
