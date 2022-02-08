import React, {useRef} from 'react';
import { CanvasStore } from '@/store/.'
import { Brush } from '@/service/tools'
import { ToolStore } from '@/store/.'

import { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@/hooks/.'
import { IBoard } from '@/models/.'

interface CanvasProps {
  board: IBoard
}

const Canvas: React.FC<CanvasProps> = ({board}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { router } = useNavigation()
  
  const setCanvasState = () => {
    const ctx =  CanvasStore.canvas.getContext('2d')
   

    const image = new Image()

    image.src = board.lastDraw.image
    const { width, height } = CanvasStore.canvas

    console.log('canvas', image)

    image.onload = () => {
      ctx.drawImage(image,  0, 0, width, height)
    }

  }

  useEffect(() => {
    CanvasStore.setCanvas(canvasRef.current)
    ToolStore.setCurrentTool(new Brush(canvasRef.current, 0))

    setCanvasState()
  
  }, [])

  useEffect(() => {
    if (router.query.id)  CanvasStore.id = router.query.id.toString()
  }, [router])

  const mouseDownHandler = () => {
    CanvasStore.pushToUndo(canvasRef.current.toDataURL())
  }

  return (
    <div className='w-full h-full flex items-center justify-center'>
      
      <canvas 
        className='bg-white border-black border-2 drop-shadow-lg rounded-sm' 
        onMouseDown={() => mouseDownHandler()} 
        ref={canvasRef} 
        width={600} 
        height={400}
      />

    </div>
  )
};

export default observer(Canvas);
