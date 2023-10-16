var canvasButtons = {};

class CanvasButton {
    constructor(id,pos,text,colour) {
        this.id = id;
        this.pos = pos;
        this.text = text;
        this.colour = colour;
    }

    draw(ctx) {
        var col = ctx.fillStyle;
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.pos.x,this.pos.y,this.pos.w,this.pos.h);
        ctx.fillStyle = col;
    }
}

function createCanvasButton(id,pos,text,colour) {
    canvasButtons.id = new CanvasButton(id,pos,text,colour);
}

function drawCanvasButtons(ctx) {
    for (var canvasButton of Object.values(canvasButtons)) {
        canvasButton.draw(ctx);
    }
}

export { createCanvasButton, drawCanvasButtons };