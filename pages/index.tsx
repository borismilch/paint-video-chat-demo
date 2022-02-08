import Layout from '../components/Layout';

import { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import { RoomStore, AnswearStore } from '@/store/.'

import { Chat, ChatPlaceholder } from '@/components/pages/index'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@/lib/firebase'

import { ProtectedRoute } from '@/components/auth'
import dynamic from 'next/dynamic';


const Home:NextPage = () => {

  const AnswearSidebar = dynamic(() => import('@/components/pages/answear/AnswearSidebar'))

  return (
    <ProtectedRoute>
    <Layout title='Some App'>

      {RoomStore.roomId && <Chat />}

      {!RoomStore.roomId && <ChatPlaceholder />}

      {AnswearStore.isCommenting && <AnswearSidebar />}
     
    </Layout>
 
    </ProtectedRoute>
 );
}

export default observer(Home)

