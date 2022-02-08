import React from 'react';

import { observer } from 'mobx-react-lite'
import {SidebarStore} from '@/store/.';

const Sidebar: React.FC = ({children}) => {

  const closeSidebar = () => {
    SidebarStore.changeOpen(false)
  }

  return (
    <>
    <div className={'sidebar ' + (SidebarStore.open && 'transform translate-x-0')}>

      {children}

    </div>

   { SidebarStore.open && <div 
      onClick={closeSidebar}
      className='
        inset-0 bg-black bg-opacity-60 w-screen h-screen absolute transition-all duration-300 z-30 flex md:hidden
    '/>
   }

    </>
  )
};

export default observer(Sidebar);
