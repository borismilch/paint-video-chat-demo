import { BsCircle, BsFillTriangleFill, BsTriangle } from 'react-icons/bs'
import { BiRectangle } from 'react-icons/bi'
import { FaPaintBrush, FaPaintRoller, FaCircle, FaEraser, FaSquare, FaImage, FaSave, FaFileDownload, FaShareSquare, FaEyeDropper } from 'react-icons/fa'

import { IToolItem } from '@/models/.'
import { TiArrowBack } from 'react-icons/ti'
import { Brush, Circle, Line, Rect, Triangle,  } from 'service/tools'

import { IoPencilOutline } from 'react-icons/io5'

import { MdOutlineCleaningServices } from 'react-icons/md'

export const tools = [
  FaPaintBrush,
   FaPaintRoller, FaEraser, FaImage, FaSave, FaFileDownload, FaShareSquare, FaEyeDropper, MdOutlineCleaningServices, BsFillTriangleFill, FaCircle, FaSquare, BsTriangle, BsCircle, BiRectangle
]

export const items: IToolItem[] = [
  {
    Icon: FaPaintBrush ,
    Tool: Brush,
  },
  {
    Icon: IoPencilOutline ,
    Tool: Line,
  },
  {
    Icon: FaEraser ,
    Tool: Brush,
  },
  {
    Icon: FaCircle ,
    Tool: Circle,
  },
  {
    Icon: FaSquare ,
    Tool: Rect,
  },


]