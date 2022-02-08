import { makeAutoObservable } from "mobx";

class ToolStore {

  currentTool = null
  bordercolor = '#000'

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentTool<T extends Object>(tool: T) {
    this.currentTool = tool
  }

  setFillColor (color: string) {
    this.currentTool.fillColor = color
  }

  setBorderColor (color: string) {
    this.currentTool.strokeColor = color
    this.bordercolor = color
  }

  setLineWidth (width: number) {
    this.currentTool.lineWidth = width
  }
}

export default new ToolStore()