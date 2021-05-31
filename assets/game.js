const ENTER = 13;


class Game {
    constructor(id) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext("2d");

        this.ctx = ctx;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;
        this.speed = 5;
        this.score = 0;
        
        this.interval = undefined;

        this.background = new Background(ctx);
        this.snake = new Snake(ctx);
        this.apple = new Apple(ctx);

        this.eatSound = new Audio("./assets/audio/audio_eat.mp3");
        this.gameOverSound = new Audio("./assets/audio/gameover.mp3");
        

    }

    start() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.move();
                this.finish = this.isGameOver();
                    if(this.finish) {
                        return;
                    };
                this.clear();
        
                this.draw();
                this.eat();
                this.updateScore();
                      
        
               }, 1000 / this.speed);
        }  
    }

    draw() {
        this.background.draw();
        this.snake.draw();
        this.apple.draw();
    }

    move() {
        this.snake.move();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    onKeyEvent(event) {
        this.snake.onKeyEvent(event);
    }

    eat() {
        if(this.apple.x == this.snake.headX && this.apple.y == this.snake.headY) {
            this.apple.x = Math.floor(Math.random() * this.apple.tileCount);
            this.apple.y = Math.floor(Math.random() * this.apple.tileCount);
            this.snake.tailLength++;
            this.score++;
            this.eatSound.play();

            if (this.score % 5 === 0 ) {
                this.speed++;
                clearInterval(this.interval);
                this.interval = null;
                this.start();
            }
        }
    }

    updateScore() {
        document.getElementById("score").innerText = `Your score is ${this.score}`;
    }

    isGameOver() {
        this.gameOver = false;
        if (this.snake.headX < 0 ||
            this.snake.headX >= this.snake.tileCount ||
            this.snake.headY < 0 ||
            this.snake.headY >= this.snake.tileCount
            ) {
            this.gameOver = true;
            this.gameOverSound.play();
            clearInterval(this.interval)

        }

        for (let i = 0; i < this.snake.snakeParts.length; i++) {
            if (this.snake.headX === this.snake.snakeParts[i].x && 
                this.snake.headY === this.snake.snakeParts[i].y) {
                    this.gameOver = true;
                    this.gameOverSound.play();
                    clearInterval(this.interval);
                    break;
            }
        } 

        if(this.gameOver) {
            this.ctx.fillStyle = "rgb(0, 0, 0)";
            this.ctx.fillRect(0, 0, this.w, this.h)
            this.ctx.fillStyle = "white";
            this.ctx.font = "40px 'Press Start 2P'";
            this.ctx.fillText("GAME OVER", this.w /4, this.h/2);
            this.ctx.font = "20px 'Press Start 2P'"
            this.ctx.fillText(`Press "ENTER" to try again`, this.w /8, this.h / 6 * 4)
            this.reset();
        } 

            return this.gameOver;

           
        
    }

    reset() {
        window.onkeydown = function(event) {
            if (event.keyCode == ENTER) {
              window.location.reload();
            }
        }
    }
}
