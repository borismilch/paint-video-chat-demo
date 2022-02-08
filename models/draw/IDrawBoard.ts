export interface IBoard {
  username: string,
  userImage: string,
  userId: string,
  name: string 
  isOnline: boolean, 
  id?: string
  createdAt: { seconds: number },
  lastDraw: IDraw
}

export interface IDraw {
  createdAt: { seconds: number },
  image: string,
  userImage: string,
  userid: string,
  username: string
}