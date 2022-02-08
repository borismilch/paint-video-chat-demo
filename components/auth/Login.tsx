import React, { SyntheticEvent } from 'react';
import Image from 'next/image'

import { auth, googleProvider, firestore } from '@/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { FaMeetup } from 'react-icons/fa'

import { useNavigation } from '@/hooks/.'

import { doc, getDoc, setDoc } from 'firebase/firestore'

const Login = () => {

  const {pushRouter} = useNavigation()

  const checkUser = async (userId: string, payload) => {
 
    let user
         
    try {
      user = await getDoc(doc(firestore, 'users', userId))
      console.log(user.data())
    } catch {}

    if (user.data()) { return }

    const {displayName, email, photoURL, uid} = payload

    await setDoc(doc(firestore, 'users', uid), {displayName, email, photoURL, uid})

    console.log('bone')
  }

  const signIn = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()

    signInWithPopup(auth, googleProvider)
      .catch(e => console.log(e.message))
      .then((result: any) => {checkUser(result.user.uid, result.user ), console.log(result.user); pushRouter('/')})
  }

  return (
    <div className="h-screen w-screen bg-main flex items-center justify-center">

      <div className="flex bg-darken flex-col shadow-md p-9 w-full mb-[40px] max-w-[500px]">

        <div className='flex flex-col items-center justify-center gap-3'>
          <FaMeetup className='text-[200px] leading-3 text-white' />

         <h1 className='text-2xl text-white font-bold'>Sign in to MeDre</h1>

         <h3 className="text-sm text-textColor font-semibold">http://localhost:3000/</h3>

          <button
            className='google_button bg-[#212121] shadow-[#212121] shadow-md hover:bg-[#181818] hover:shadow-[#181818]'
            onClick={signIn} 
          >
            Sign in with Google</button>

        </div>

      </div>

      
    </div>
  )
};

export default Login;
