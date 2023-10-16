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
            var col = ctx.fillStyle;
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.pos.x,this.pos.y,this.pos.w,this.pos.h);
            ctx.fillStyle = col;
        }
    }
}

function createCanvasButton(id,pos,text,colour,clickCallback = ()=>{}) {
    canvasButtons.id = new CanvasButton(id,pos,text,colour,clickCallback);
}

function setCanvasButtonVisibility(id,visible) {
    canvasButtons[id].visible = visible;
}

function drawCanvasButtons(ctx) {
    for (var canvasButton of Object.values(canvasButtons)) {
        canvasButton.draw(ctx);
    }
}

function handleClick(clickEvent,screen) {
    alert("test2");
    var clickPos = {x:clickEvent.clientX,y:clickEvent.clientY};
    for (var canvasButton of Object.values(canvasButtons)) {
        if (pointInRect(canvasButton.pos,clickPos) && canvasButton.isInteractable(screen)) {
            canvasButton.click();
        }
    }
}

export { createCanvasButton, drawCanvasButtons, handleClick };