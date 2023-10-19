function pointInRect(rect,point) {
    return ((point.x > rect.x) && (point.x < rect.x+rect.w) && (point.y > rect.y) && (point.y < rect.y+rect.h));
}


var canvasButtons = {};

class CanvasButton {
    constructor(id,pos,text,colour,hoverColour,clickCallback,screen) {
        this.id = id;
        this.pos = pos;
        this.text = text;
        this.colour = colour;
        this.hoverColour = hoverColour;
        this.click = clickCallback;
        this.screen = screen;

        this.visible = true;
    }

    isInteractable(screen) {
        return (this.visible && screen == this.screen);
    }

    realPos(ctx) {
        var realPos = { ...this.pos };
        if (typeof this.pos.x === "string") { realPos.x = math.evaluate(this.pos.x,{w:ctx.canvas.width,h:ctx.canvas.height})}
        if (typeof this.pos.y === "string") { realPos.y = math.evaluate(this.pos.y,{w:ctx.canvas.width,h:ctx.canvas.height})}
        if (typeof this.pos.w === "string") { realPos.w = math.evaluate(this.pos.w,{w:ctx.canvas.width,h:ctx.canvas.height})}
        if (typeof this.pos.h === "string") { realPos.h = math.evaluate(this.pos.h,{w:ctx.canvas.width,h:ctx.canvas.height})}
        return realPos;
    }

    draw(ctx,screen=this.screen) {
        if ( this.isInteractable(screen) ) {
            var col = ctx.fillStyle;
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.realPos(ctx).x,this.realPos(ctx).y,this.realPos(ctx).w,this.realPos(ctx).h);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = String(this.realPos(ctx).h-5)+"px Arial";
            ctx.fillText(this.text,this.realPos(ctx).x + (0.5*this.realPos(ctx).w), this.realPos(ctx).y + (0.5*this.realPos(ctx).h));
            ctx.fillStyle = col;
        }
    }
}

function createCanvasButton(id,pos,text,colour,clickCallback = ()=>{},screen) {
    canvasButtons.id = new CanvasButton(id,pos,text,colour,hoverColour,clickCallback,screen);
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

function handleClick(ctx,clickEvent,screen) {
    var clickPos = {x:clickEvent.clientX,y:clickEvent.clientY};
    for (var canvasButton of Object.values(canvasButtons)) {
        if (pointInRect(canvasButton.realPos(ctx),clickPos) && canvasButton.isInteractable(screen)) {
            canvasButton.click();
        }
    }
}

export { createCanvasButton, drawCanvasButtons, handleClick };