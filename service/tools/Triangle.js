import Tool from "./Tool";

export default class Triangle extends Tool {
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
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x, y, w, h) {  
        const img = new Image()
        img.src = this.saved
        img.onload = () => {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
           
            this.ctx.moveTo(x + (w - x) / 2, y);
            this.ctx.lineTo(x, h);
            this.ctx.lineTo(w, h);
            this.ctx.lineTo(x + (w - x) / 2, y);

            this.ctx.closePath()

            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx, x, y, w, h, color) {
        ctx.fillStyle = color
        ctx.beginPath()
        
        this.ctx.moveTo(x / 2, y);
        this.ctx.lineTo(x, h);
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(x + (w - x) / 2, y);
        this.ctx.closePath()
        
        ctx.fill()
        ctx.stroke()
    }
}
