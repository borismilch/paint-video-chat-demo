import React, { ReactElement } from 'react';

import { ISidebarItem } from '@/models/.';
import { useNavigation } from '@/hooks/.'

interface SidebarItemProps {
  sidebarItem: ISidebarItem, 
  Icon: ReactElement<any, any>
}

const SidebarItem:React.FC <SidebarItemProps> = (props) => {

  const {sidebarItem: { text, onClick, to }, Icon} = props

  const { pushRouter } = useNavigation()

  return (
    <div 
      onClick={onClick ? onClick.bind(null) : pushRouter.bind(null, to)}
      className='flex items-center  gap-2 w-full p-2 px-3 hover:bg-darken cursor-pointer transition-all duration-200'>

    <div className='opacity-60'>
      {Icon}
    </div>
     

     <p className="font-medium leading-3 text-white text-opacity-50">
       {text}
     </p>

    </div>
  )
};

export default SidebarItem;
