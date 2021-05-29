const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_BOTTOM = 40
const KEY_LEFT = 37

class Snake {
    constructor(ctx) { 
        this.ctx = ctx;

        this.tileCount = 26;
        this.tileSize = this.ctx.canvas.width / this.tileCount - 2;

        this.headX = 13;
        this.headY = 13;
        this.vx = 0;
        this.vy = 0;
        
        this.snakeParts = [];
        this.tailLength = 0;
    }

    draw() {
        this.ctx.fillStyle = "black";
            for (let i = 0; i < this.snakeParts.length; i++) {
                this.part = this.snakeParts[i];
                this.ctx.fillRect(
                    this.part.x * this.tileCount, 
                    this.part.y * this.tileCount, 
                    this.tileSize, 
                    this.tileSize)
        } 

        this.snakeParts.push(new SnakeBody(this.ctx, this.headX, this.headY));
        while (this.snakeParts.length > this.tailLength) {
            this.snakeParts.shift();
        }

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(
            this.headX * this.tileCount,
            this.headY * this.tileCount, 
            this.tileSize, 
            this.tileSize);

    }

    move() {
        this.headX = this.headX + this.vx;
        this.headY = this.headY+ this.vy;
    }

    onKeyEvent(event) {
        if (event.keyCode === KEY_UP) {
            if (this.vy === 1) {
                return;
            }
            this.vy = -1;
            this.vx = 0;
        } else if (event.keyCode === KEY_BOTTOM) {
            if (this.vy === -1) {
                return;
            }
            this.vy = 1;
            this.vx = 0;
        } else if (event.keyCode === KEY_LEFT) {
            if (this.vx === 1) {
                return;
            }
            this.vy = 0;
            this.vx = -1;
        } else if (event.keyCode === KEY_RIGHT) {
            if (this.vx === -1) {
                return;
            }
            this.vy = 0;
            this.vx = 1;
        }
    }
}      

class SnakeBody {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
    }
}