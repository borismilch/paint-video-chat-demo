import React from 'react';

import Layout from '../components/Layout';
import { DrawList } from '@/components/pages/boards';

import { auth } from '@/lib/firebase'
import  { useAuthState } from 'react-firebase-hooks/auth' 

const dashboard = () => {

  const [user] = useAuthState(auth)

  return (
    <Layout title='dashboard'>
      <DrawList />  
    </Layout>
  )
};

export default dashboard;
