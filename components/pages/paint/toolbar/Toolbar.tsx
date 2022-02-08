import React from 'react';
import { SidebarContainer } from '@/components/containers';

import { items, ToolbarItem, Settings } from '.'
import { observer } from 'mobx-react-lite';
import { ToolStore, CanvasStore } from '@/store/.'
import { IToolItem } from '@/models/.';
import { ImRedo2, ImUndo2 } from 'react-icons/im'

import { FaBroom, FaSave } from 'react-icons/fa'
import { useUploadData, useNavigation } from '@/hooks/.'
import { useEffect } from 'react';
import { CanvasService } from 'service'
import { BigLoader } from '@/components/loaders';

const Toolbar = () => {

  const {url, getUploadedData, loading } = useUploadData('draws/offline/')
  const { pushRouter } = useNavigation()

  const updateData = async () => {
    await CanvasService.saveChanges(url)
    pushRouter('/dravs')
  }

  useEffect(() => {
    if (!loading && url) {
      updateData()
    }
  }, [loading])

  const selectTool = (toolItem: IToolItem, id: number) => {
    ToolStore.setCurrentTool(new toolItem.Tool(CanvasStore.canvas, id))
    ToolStore.setBorderColor(ToolStore.bordercolor)

    if (id === 2) {
      ToolStore.setBorderColor('#fff')
    }
  }

  const saveChanges = async () => {
    await getUploadedData(CanvasStore.canvas.toDataURL() as any)
  }

  return (
    <>

      { loading && (
        <div className='w-screen h-screen z-[100] bg-black bg-opacity-70 absolute flex items-center justify-center'>
          <div className='pb-[50px]'>
          <BigLoader />
          </div>
      
        </div>
      )}

    <SidebarContainer >

      <div className='flex items-center flex-col flex-shrink-0 w-[170px] '>

        <div className='grid grid-cols-3 my-3'>

          {
            items.map((tool, idx) => (
              <ToolbarItem 
                id={idx} 
                toolItem={tool}
                onClick={() => selectTool(tool, idx)} 
                key={idx}
              />
            ))
          }

          <ToolbarItem 
            id={items.length}
            onClick={() => CanvasStore.undo()}
            toolItem={{ Icon: ImUndo2 }}
          />

          
          <ToolbarItem 
            id={items.length + 2}
            onClick={() => CanvasStore.redo()}
            toolItem={{ Icon: ImRedo2 }}
          />

          <ToolbarItem 
            id={items.length + 1}
            onClick={() => CanvasStore.clear()}
            toolItem={{ Icon: FaBroom }}
          />

          <ToolbarItem 
            id={items.length + 1}
            onClick={saveChanges}
            toolItem={{ Icon: FaSave }}
          />

        </div>

        <Settings />

   
      </div>

    </SidebarContainer>

    </>
  )
};

export default observer(Toolbar);
