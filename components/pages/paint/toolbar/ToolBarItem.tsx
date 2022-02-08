import React from 'react';

import { IToolItem } from '@/models/.';
import { observer } from 'mobx-react-lite';

import { ToolStore } from '@/store/.'

interface ToolItemProps {
  toolItem: IToolItem
  id: number
  onClick: () => void
}

const ToolBaItem: React.FC<ToolItemProps> = (props) => {

  const {toolItem, id, onClick} = props

  return (
    <div 
      onClick={onClick}
      className={'toolitem rounded-md ' + ( ToolStore.currentTool && ToolStore.currentTool?.id === id && 'bg-light border border-border')}>
      {<toolItem.Icon className='text-xl text-white' />}
      
    </div>
  )
};

export default observer(ToolBaItem);
