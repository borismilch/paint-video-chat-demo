import React from 'react';

import { ISidebarItem } from '@/models/.'
import { SidebarItem } from '.'
import { MdDraw } from 'react-icons/md'
import { useNavigation } from '@/hooks/.'

import { BsChatDots, BiDotsVerticalRounded } from '@/components/icons'

const SidebarItems: React.FC = () => {  

  const { pushRouter } = useNavigation()

  const ff = () => {
    console.log('fuck')
  }

  const sidebarItems = [
    {
      text: 'Chatting',
      Icon: <BsChatDots className="text-white" />,
      to: '/'
    },

    {
      text: 'Drawing',
      Icon: <MdDraw className="text-white " />,
      to: '/dravs'
    },

    {
      text: 'Reactions and ',
      Icon: <BiDotsVerticalRounded className="text-white" />,
      to: '/history'
    },
  ]

  return (
    <div className='flex mt-3 flex-col items-center'>

    {
      sidebarItems.map(item => (
 
        <SidebarItem 
          sidebarItem={{text: item.text, to: item.to}}  
          Icon={item.Icon} 
        
        />
 
      ))
    }

    </div>
  )
};

export default SidebarItems;
