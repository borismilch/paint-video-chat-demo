
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { IMessage } from '@/models/.'

import { firestore } from '@/lib/firebase'
import { AnswearStore, MediaStore, RoomStore } from '../store'
import IUser from '@/models/types'

class MessageService {
  static async sendMessage (updateId: string, roomId: string, message: IMessage) {

    if (updateId) {
      const messageRef = collection(firestore, 'rooms', roomId, 'messages', updateId, 'answears')
      await addDoc(messageRef, message)
     

    } else {
      const messageRef = collection(firestore, 'rooms', roomId, 'messages')
      await addDoc(messageRef, message)
    }

  }
  static cleanStores () {
   
    MediaStore.cleanImages()
    MediaStore.cleanDocuments(  )

    MediaStore.isVideo = false 
    MediaStore.isDocuments = false
    AnswearStore.cleanMessageComment()
  }

  static  createBody (value: string): [any, string] {
    const body = MediaStore.isDocuments ? MediaStore.documents : MediaStore.isVideo ? MediaStore.images[0] : MediaStore.images.length ?
    MediaStore.images.slice().map(item => ({id: item.id, url: item.url})) : value
    const role = MediaStore.isDocuments ? 'document' :  MediaStore?.isVideo ? 'video' : MediaStore?.images?.length ? 'image': 'text'

    return [body, role]
  }

  static async getAddressat (users: IUser[]) {
    
    const address = prompt('For who?')

    const valid = users.find((user: IUser) => user.displayName === address || user.email === address)

    if (!valid) {
      alert('invalid user') 
      return
    }

    if (address) {
      return address
    }
  }

  static async deleteItem (messageId: string) {
    const confirm = prompt('Are you sure?')
    if (!confirm) {
      return
    }
    await deleteDoc(doc(firestore, "rooms", RoomStore.roomId, 'messages', messageId))
  }

  static async updateItem (messageId: string) {
    const newMessage = prompt('Enter new mesage here')
    if (!newMessage) { alert('wrong new Message');return }
    await updateDoc(doc(firestore, "rooms", RoomStore.roomId, 'messages', messageId), { body: newMessage })
  }
  
}

export default MessageService