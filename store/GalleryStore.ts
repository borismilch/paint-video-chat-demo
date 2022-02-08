import { makeAutoObservable, observable } from 'mobx'

interface IImage {url: string, id: number}

class GalleryStore {
  images: IImage[] = observable([])
  selectedImage: number = 0


  constructor() {
    makeAutoObservable(this)
  }

  incrementImage () {
    if (this.selectedImage + 1 < this.images.length) {
      this.selectedImage += 1
    }
  }

  decrementImage () {
    if (this.selectedImage > 0) {
      this.selectedImage -= 1
    }
  }

  setImages (images: IImage[]) {
    this.images = images
  }

  setCurrentImage (idx: number) {
    this.selectedImage = idx
  }

  clearData () {
    this.images = []
  }
}

export default new GalleryStore()