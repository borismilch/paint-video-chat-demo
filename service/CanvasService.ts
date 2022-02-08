import { CanvasStore } from '@/store/.'
import { Brush, Rect } from './tools'

import { firestore } from '@/lib/firebase'
import { serverTimestamp,  doc, updateDoc } from 'firebase/firestore'
import { auth } from '@/lib/firebase'

import { IDraw } from '../models'

export default class CanvasSerivce {
  static drawHandler = (msg: any, canvas: HTMLCanvasElement) => {
    const figure = msg.figure
    const ctx = canvas.getContext('2d')
    switch (figure.type) {
        case "brush":
            Brush.drawSome(ctx, figure.x, figure.y)
            break
        case "rect":
            Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
            break
        case "finish":
            ctx.beginPath()
            break
    } 
  }

  static saveChanges = async (url: string) => {
    const fireref = doc(firestore, 'boards', CanvasStore.id)
    const user = auth.currentUser

    const newSave: IDraw = {
      createdAt: serverTimestamp() as any,
      image: url,
      userImage: user.photoURL,
      userid: user.uid,
      username: user.displayName
    }

    await updateDoc(fireref, {lastDraw: newSave})
  }

}