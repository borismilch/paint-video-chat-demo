import { makeAutoObservable } from 'mobx'

class RoomStore {

  roomId: string = '' as string

  constructor () {
    makeAutoObservable(this)
  }

  setCurrentRoom (id: string) {
    this.roomId = id
  }
}

export default new RoomStore()