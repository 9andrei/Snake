class Food {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 5;
        this.y = 5;
        this.tileCount = 28;
        this.tileSize = this.ctx.canvas.width / this.tileCount - 2;

        this.img = new Image();
        this.img.src = "./assets/Images/apple.png";

        this.img.isReady = false;
        this.img.onload = () => {
        this.img.isReady = true
            }
    }

    isReady() {
        return this.img.isReady;
      }


    draw() {
        if (this.img.isReady()) {
            this.ctx.drawImage(this.x * this.tileCount, this.y * this.tileCount, this.tileSize, this.tileSize)
        }
    }
}