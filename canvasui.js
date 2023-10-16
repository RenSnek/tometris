function pointInRect(rect,point) {
    return ((point.x > rect.x) && (point.x < rect.x+rect.w) && (point.y > rect.y) && (point.y < rect.y+rect.h));
}



var canvasButtons = {};

class CanvasButton {
    constructor(id,pos,text,colour,clickCallback) {
        this.id = id;
        this.pos = pos;
        this.text = text;
        this.colour = colour;
        this.click = clickCallback;
    }

    draw(ctx) {
        var col = ctx.fillStyle;
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.pos.x,this.pos.y,this.pos.w,this.pos.h);
        ctx.fillStyle = col;
    }
}

function createCanvasButton(id,pos,text,colour,clickCallback) {
    canvasButtons.id = new CanvasButton(id,pos,text,colour,clickCallback = ()=>{});
}

function drawCanvasButtons(ctx) {
    for (var canvasButton of Object.values(canvasButtons)) {
        canvasButton.draw(ctx);
    }
}

function handleClick(clickEvent) {
    alert("test2");
    var clickPos = {x:clickEvent.clientX,y:clickEvent.clientY};
    for (var canvasButton of Object.values(canvasButtons)) {
        if (pointInRect(canvasButton.pos,clickPos)) {
            alert("test-"+canvasButton.id);
            canvasButton.click();
        }
    }
}

export { createCanvasButton, drawCanvasButtons, handleClick };