import { makeAutoObservable } from 'mobx'

class CommentStore {

  isCommenting: boolean = false
  messageId: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  commentMessage (messageId: string) {
    this.messageId = messageId 
    this.isCommenting = true
  }

  cleanMessageComment () {
    this.messageId = ''
    this.isCommenting = false
  }
}

export default new CommentStore()