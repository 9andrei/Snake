window.addEventListener("load", () => {
    const game = new Game("canvas");

    document.getElementById("start-btn").addEventListener("click", () =>{
            game.start();
        })

    document.addEventListener("keydown", (event) => {
        game.onKeyEvent(event);
    })
})