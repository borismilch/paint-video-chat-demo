import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas, id) {
        super(canvas, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
      this.mouseDown = false
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
           this.draw(this.ctx, e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
          
        }
    }

    draw(ctx, x, y) {
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    static drawSome (ctx, x, y) {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}
