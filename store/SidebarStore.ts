import { makeAutoObservable } from 'mobx'

class SidebarStore {

  open: boolean = false

  constructor () {
    makeAutoObservable(this)
  }

  changeOpen (val: boolean) {
    this.open = val
    console.log(val)
  }
}

export default new SidebarStore()