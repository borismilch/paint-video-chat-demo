import { makeAutoObservable } from 'mobx'
import { Ref } from 'react'

import { IDocument } from '@/models/.'

class SendingImagesStore {

  images: {url: string, id: number}[] = []
  files: File[] = [] as File[]

  documents: IDocument[] = []

  isVideo: boolean = false
  isDocuments: boolean = false

  fileInputRef: Ref<HTMLInputElement> = null 

  canUpload: boolean = false as boolean

  constructor() {
    makeAutoObservable(this)
  }

  changeCanUpload (val: boolean) {
    this.canUpload = val
  }

  addImage (url: string) {
    this.canUpload = false
    this.images.push({url, id: Date.now()})
  }

  removeImage (idx: number) {
    this.images = this.images.filter((item, i) =>  i !== idx)
    this.files = this.files.filter((item, i) => i !== idx)

  }

  cleanImages () {
    this.images = []
    this.files = []
  }

  addFile (file: File) {
    this.files.push(file)
  }

  addVideo () {
    this.isVideo = true
  }

  addDocument () {
    console.log('docs')
    this.isDocuments = true
  }

  pushDocumentData (doc: IDocument) {
    this.documents.push(doc)
  }

  cleanDocuments () {
    this.documents = []
  }

} 

export default new SendingImagesStore()