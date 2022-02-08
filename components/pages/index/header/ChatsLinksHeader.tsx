import React from 'react';

import AppIcon, {HiLink, HiOutlinePlusSm} from '@/components/icons'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '@/lib/firebase'
import { collection, addDoc, doc } from 'firebase/firestore'
import { observer } from 'mobx-react-lite'

import { RoomStore } from '@/store/.'

const ChatsLinksHeader = () => {

  const [urls] = useCollection(collection(firestore, 'rooms', RoomStore.roomId, 'links'))

  const addLink = async  () => {
    const link = prompt('Enter a link to proseed')

    let valid = link?.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)

    if (!valid) { alert('wrong url!'); return }

    const name = prompt('Enter name of your link')

    const linksRef = collection(firestore, 'rooms', RoomStore.roomId, 'links')

    await addDoc(linksRef, { name, href: link })
  }

  return (
    <div className='text-sm text-textColor p-1 shadow-md'>

      <AppIcon 
        Icon={<HiOutlinePlusSm className='text-xl text-textColor'/>}
        classes={'rounded-md active:scale-90 text-textColor'}
        text={'Add new'}
        onClick={addLink}
      />

      {
        urls?.docs?.map(doc => (
          <AppIcon 
            key={doc.data().id}
            Icon={<HiLink className='text-xl text-gray-500'/>}
            classes={'rounded-md active:scale-90'}
            text={doc.data().name}
            onClick={() => window.location = doc.data().href}
            tooltip={[doc.data().href, 'tooltip-bottom']}
        />
        ))
      }
      
    </div>
  )
};

export default observer(ChatsLinksHeader);
