import React from 'react';
import { FaTrash, FaShareSquare, FaPenAlt } from 'react-icons/fa'
import AppIcon from '@/components/icons'

import { BoardService } from 'service'
import { IBoard, IRoom } from '@/models/.';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/lib/firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'

interface BoardActionsProps {
  board: IBoard
}

const BoardActions: React.FC<BoardActionsProps> = ({board}) => {

  const [user] = useAuthState(auth)
  const [rooms] = useCollectionOnce(collection(firestore, 'rooms'))

  const sendForsome = () => {
    BoardService.sendBoardImage(
      user, 
      rooms.docs.map(
        doc => ({...doc.data(), id: doc.id}
      )) as IRoom[], 
      board.lastDraw.image
    )
  }

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className='flex items-center'>

      <AppIcon 
        Icon={<FaPenAlt className='text-textColor text-sm' />}
        classes="p-1"
        onClick={() => { BoardService.changeName(board.id)}}
      />
      <AppIcon 
        Icon={<FaTrash  className='text-textColor text-sm' />}
        classes="p-1"
        onClick={() => { BoardService.deleteBoard(board.id) }}
      />
     { board.lastDraw.userid && <AppIcon 
        Icon={<FaShareSquare  className='text-textColor text-sm' />}
        classes="p-1"
        onClick={sendForsome.bind(null)}
      />}

    </div>
  )
};


export default BoardActions;
