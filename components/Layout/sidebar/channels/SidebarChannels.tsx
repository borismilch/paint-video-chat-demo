import React from 'react';
import { ISidebarItem } from '@/models/.';

import { useToggle } from '@/hooks/.'
import {MdOutlineArrowDropDown, HiHashtag} from '@/components/icons'
import { SidebarItem } from '..'

import { RoomStore } from '@/store/.'
import { observer } from 'mobx-react-lite'

import { AnimatePresence, motion } from 'framer-motion'
import { useNavigation } from '@/hooks/.'

const SidebarChannels: React.FC<{channels: ISidebarItem[]}> = ({channels}) => {

  const [open, changeOpen] = useToggle(false)
  const { pushRouter, router } = useNavigation()

  const channelSidebatItem: ISidebarItem = {
    text: "Channels",
    onClick: changeOpen.bind(null, !open)
  }

  const selectChatSidebar = (itemId: string) => {
    if (router.pathname !== '/') {
      pushRouter('/')
    }
    RoomStore.setCurrentRoom(itemId) 

  }

  return (
    <div className="flex flex-col">

      <SidebarItem
        sidebarItem={channelSidebatItem} 
        Icon={<MdOutlineArrowDropDown className={
          'text-white text-opacity-50 text-2xl font-medium transform transition-all duration-200 ' 
          + (open && 'rotate-180')} />}
      />

      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

        <div className="flex flex-col px-4">
          {channels?.map(item => (
            <SidebarItem 
              key={item.id}
              sidebarItem={{text: item.text, onClick: selectChatSidebar.bind(null, item.id) }}
              Icon={<HiHashtag className='text-white text-opacity-50 ' />}
            />
          ))}
        </div>

        </motion.div>
      )}
    </AnimatePresence>
      
    </div>
  )
};

export default observer(SidebarChannels);
