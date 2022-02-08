import React from 'react';
import { useNavigation } from '@/hooks/.'

import Layout from '@/components/Layout';
import { useDocument } from 'react-firebase-hooks/firestore'
import { firestore } from '@/lib/firebase'
import { doc } from 'firebase/firestore'

import dynamic from 'next/dynamic'
import { IBoard } from '@/models/.';

const BoardPage = () => {

  const ToolBar = dynamic(() => import('@/components/pages/paint/toolbar/Toolbar'))
  const Canvas = dynamic(() => import('@/components/pages/paint/canvas/Canvas'))

  const {query: {id}} = useNavigation()
  
  const boardRef = doc(firestore, 'boards', id + '')
  const [board] = useDocument(boardRef)


  return (
    <Layout sidebar={false} title={'| Draw'}>
        <div className='w-full flex h-full bg-main'>
          <ToolBar />

         { board && <Canvas board={board.data() as IBoard} />}
          
        </div>
    </Layout>
  )
};

export default BoardPage
