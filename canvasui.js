function pointInRect(rect,point) {
    return ((point.x > rect.x) && (point.x < rect.x+rect.w) && (point.y > rect.y) && (point.y < rect.y+rect.h));
}


var canvasButtons = {};

class CanvasButton {
    constructor(id,pos,text,colour,clickCallback,screen) {
        this.id = id;
        this.pos = pos;
        this.text = text;
        this.colour = colour;
        this.click = clickCallback;
        this.screen = screen;

        this.visible = true;
    }

    isInteractable(screen) {
        return (this.visible && screen == this.screen);
    }

    draw(ctx,screen=this.screen) {
        if ( this.isInteractable(screen) ) {
            var literalPos = this.pos
            if (typeof this.pos.x === "string") { literalPos.x = math.evaluate(this.pos.x,{w:ctx.canvas.width,h:ctx.canvas.height})}
            if (typeof this.pos.y === "string") { literalPos.y = math.evaluate(this.pos.y,{w:ctx.canvas.width,h:ctx.canvas.height})}
            if (typeof this.pos.w === "string") { literalPos.w = math.evaluate(this.pos.w,{w:ctx.canvas.width,h:ctx.canvas.height})}
            if (typeof this.pos.h === "string") { literalPos.h = math.evaluate(this.pos.h,{w:ctx.canvas.width,h:ctx.canvas.height})}

            var col = ctx.fillStyle;
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.pos.x,this.pos.y,this.pos.w,this.pos.h);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text,this.pos.x + (0.5*this.pos.w), this.pos.y + (0.5*this.pos.h));
            ctx.fillStyle = col;
        }
    }
}

function createCanvasButton(id,pos,text,colour,clickCallback = ()=>{},screen) {
    canvasButtons.id = new CanvasButton(id,pos,text,colour,clickCallback,screen);
}

function setCanvasButtonVisibility(id,visible) {
    canvasButtons[id].visible = visible;
}

function drawCanvasButtons(ctx,screen) {
    for (var canvasButton of Object.values(canvasButtons)) {
        if (canvasButton.isInteractable) {
            canvasButton.draw(ctx,screen);
        }
    }
}

function handleClick(clickEvent,screen) {
    var clickPos = {x:clickEvent.clientX,y:clickEvent.clientY};
    for (var canvasButton of Object.values(canvasButtons)) {
        if (pointInRect(canvasButton.pos,clickPos) && canvasButton.isInteractable(screen)) {
            canvasButton.click();
        }
    }
}

export { createCanvasButton, drawCanvasButtons, handleClick };