import IUser from "@/models/types";

import { firestore } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { IBoard, IDraw, IRoom } from "../models";
import { serverTimestamp } from "firebase/firestore";
import { createMessage } from "@/utils/helpers/createMessage";
import { MessageService } from ".";

export class BoardService {
  static async addDrawBoard (user: IUser) {

    const newBoard: IBoard = this.DrawPrompt(user)
    const boardRef = collection(firestore, 'boards')

    await addDoc(boardRef, newBoard)
  }
  
  static DrawPrompt (user: IUser): IBoard {
    const name = prompt('Give it a name')
    const isOnline = confirm('In it online')

    const newBoard: IBoard = {
      username: user.displayName,
      userImage: user.photoURL,
      userId: user.uid,
      name, isOnline, 
      createdAt: serverTimestamp() as any,
      lastDraw: {} as IDraw
    }

    return newBoard
  }

  static async changeName (boardId: string) {
    const name = prompt('Give it a name')
    const boardRef = doc(firestore, 'boards', boardId)

    await updateDoc(boardRef, { name })
  }

  static async deleteBoard (boardId: string) {
    const boardRef = doc(firestore, 'boards', boardId)

    await deleteDoc(boardRef)
  }

  static async sendBoardImage (user: IUser, rooms: IRoom[], url: string) {
    const roomName = prompt('enter room name')

    const existing: IRoom = rooms.find(room => room.name === roomName)

    if (!existing) { alert('invalid room'); return }
    const collectionRef = collection(firestore, 'rooms', existing.id, 'messages')

    const newMessage = createMessage('image', [{id: Date.now().toString(), url}] as any, '', user, )

    await addDoc(collectionRef, newMessage)
  }
}

export default BoardService