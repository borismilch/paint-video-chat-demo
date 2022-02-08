import { IDropItem } from '@/models/.';
import React from 'react';

const DropList: React.FC<{dropItems: IDropItem[], onClose: () => void}> = ({dropItems, onClose}) => {
  return (
    <div 
      onClick={onClose.bind(null)}
      className='flex items-center w-[130px] bg-white rounded-2xl drop-shadow-lg overflow-hidden transition-all duration-300'>
      {
        dropItems.map(item => (
          <div
            key={item.id}
            onClick={item.onClick.bind(null)}
            className="p-2 transition-all text-gray-600 duration-300 cursor-pointer hover:bg-gray-100">
              {item.text}
          </div>
        ))
      }
    </div>
  )
};

export default DropList;
