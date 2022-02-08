
import IUser from "@/models/types"
import { serverTimestamp } from "firebase/firestore"

export const createMessage = (role: string, body: any, adressat: string, user: IUser) => {
  const message = {
    createdAt: serverTimestamp(),
    body,
    userImage: user?.photoURL,
    username: user?.displayName,
    userId: user?.uid,
    role,
    adressat: adressat || ''
  }

  return  message
}