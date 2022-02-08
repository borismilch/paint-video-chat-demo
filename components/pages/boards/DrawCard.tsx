import React, { useEffect } from 'react';

import { IBoard } from '@/models/.';
import Image from 'next/image';

import { dayts } from '@/lib/dayts';
import { useNavigation } from '@/hooks/.'

import { BoardActions } from '.'

const delaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5jCXj5o6IqrlByTxBeYCBurHV4m_sKng6Se8vKNAjRB0t8M2cTIhPPm9K6N2PzZKPzts&usqp=CAU'

const DrawCard: React.FC<{board: IBoard}> = ({board}) => {

  const {pushRouter} = useNavigation()

  const date =  dayts((board?.lastDraw?.createdAt?.seconds * 1000) || Date.now()).fromNow()

  useEffect(() => {
    console.log(board)
  }, [])


  return (
    <div 
      onClick={pushRouter.bind(null, '/board/' + board.id)}
      className='boardCard '>
      
      <div className='h-[120px] rounded-tl-2xl w-full relative'>

        <Image 
          src={board.lastDraw.createdAt ? board.lastDraw.image : delaultImage}
          layout="fill"
          objectFit='cover'
        />

      </div>

      <div className='p-3 flex flex-col w-full gap-3 '>

        <div className='flex w-full items-center justify-between'>

          <p className='text-xs text-textColor max-w-[90px] truncate'>{board.name}</p>

          <p className='text-[9px] text-textColor'>updated: {date}</p>
        </div>

        <div className='flex items-center justify-between'>
 
          <div className='flex w-full items-center gap-2'>

            <div className='avatar'>

              <Image 
                src={board.userImage}
                layout="fill"
                objectFit='cover'
              />

            </div>

            <p className='text-sm text-textColor'>{board.username}</p>

          </div>

          <BoardActions board={board} />

        </div>

      </div>
      
    </div>
  )
};

export default DrawCard;
