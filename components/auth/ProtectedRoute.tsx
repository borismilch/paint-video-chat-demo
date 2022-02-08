import React from 'react';
import { useRouter } from 'next/router';

import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../forms/loaders/Loader';
import dynamic from 'next/dynamic';

const Redirect: React.FC = ({children}) => {

  const router = useRouter()
  const Login = dynamic(() => import('./Login'))

  const [user, loading] = useAuthState(auth)

  if (!user && loading) {
    return <Loader />
  }

  if (!user && !loading) {
    return <Login />
  }
  return (
    <>
      {children}
    </>
  )
};

export default Redirect;
