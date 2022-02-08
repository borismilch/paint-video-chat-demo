import { makeAutoObservable } from "mobx";

class SendModeStore {
  mode: string = 'text'

  constructor() {
    makeAutoObservable(this)
  }

  setMode(val: string) {
    this.mode = val
  }
}

export default new SendModeStore()