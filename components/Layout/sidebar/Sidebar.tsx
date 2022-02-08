import React, { useEffect } from 'react';

import {addDoc, collection} from 'firebase/firestore'
import { firestore } from '@/lib/firebase';
import {HiPlusSm} from 'react-icons/hi'
import { observer } from 'mobx-react-lite'

import { useCollection } from 'react-firebase-hooks/firestore'
import { ISidebarItem } from '@/models/.';
import { useState } from 'react'
import dynamic from 'next/dynamic';

import { SidebarContainer } from '@/components/containers';

const Sidebar = () => {

  const [channels] = useCollection(collection(firestore, 'rooms'))
  const [myChannels, setMyChannels] = useState<ISidebarItem[]>([])

  const SidebarHeader = dynamic(() => import('./SidebarHeader'))
  const SidebarItems = dynamic(() => import('./SidebarItems'))
  const SidebarChannels = dynamic(() => import('./channels/SidebarChannels'))
  const SidebarItem = dynamic(() => import('./SidebarItem'))

  const AddChannel = async () => {
    const channelName = prompt('Please, enter channel name')

    if (!channelName) { return }  
      
    const docRef = collection(firestore, 'rooms')
    await addDoc(docRef, { name: channelName })
    
  }

  useEffect(() => {
    setMyChannels(channels?.docs?.map(doc =>( {text: doc.data().name, id: doc.id} )))
  }, [channels])

  return (

    <SidebarContainer >
      <SidebarHeader />

      <SidebarItems  />

      <SidebarChannels channels={myChannels} />
        

      <SidebarItem 
        sidebarItem={{
          text: 'Add Channel',
          onClick: AddChannel,
        }} 
        Icon = {<HiPlusSm className="text-xl text-textColor" /> }

      />
    </SidebarContainer>
  )
};

export default observer(Sidebar);
