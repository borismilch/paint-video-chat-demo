import React, { ChangeEvent, useState } from 'react';
import { ToolStore } from '@/store/.'

import { FaSlash } from 'react-icons/fa'
import { IoColorPalette } from 'react-icons/io5'
import { IoMdColorFill } from 'react-icons/io'

const Settings = () => {

  const [width, setWidth] = useState<number>(1)

  const changeLineHandler = (event: ChangeEvent<HTMLInputElement>) => {

    setWidth(prev => ( +event.target.value > 25 || +event.target.value < 1) ? prev : +event.target.value )
    ToolStore.setLineWidth(width)
  }

  const changeColorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    ToolStore.setBorderColor(event.target.value)
  }

  const changeFillColorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    ToolStore.setFillColor(event.target.value)
  }


  return (
    <div className="flex items-center flex-col w-full gap-2">
    
    
      <div className='flex items-center gap-2 w-full ml-12'>
        
      <FaSlash className='text-white' />

        <input
          value={width}
          onChange={changeLineHandler}
          id="line-width"
          type="number"
          className='text-white rounded-lg w-[80%]] bg-darken border-0'
          defaultValue={1} min={1} max={50}
        />
      
      </div>

      <div className='flex items-center gap-2 w-full ml-12'>

        <IoColorPalette className="text-white" />
        <input onChange={changeColorHandler} id="stroke-color" type="color"/>
        
      </div>

      <div className='flex items-center gap-2 w-full ml-12'>

        <IoMdColorFill className="text-white" />
        <input onChange={changeFillColorHandler} id="stroke-color" type="color"/>

      </div>
     

    </div>
  )
};

export default Settings;
