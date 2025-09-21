import { getContext, keys } from "./week03-module.js";

document.addEventListener("DOMContentLoaded", ( ev ) => {
    //  เขียนโค้ดตรงนี้ coding here!
    const ctx = getContext ("#myCanvas");

    const player ={
        x : 400,
        y : 300,
        color : "#8a045cff",
        size : 80, // width = height กว้างยาวเท่ากัน
    };

    function draw () {
        // clear canvas (clear pixel/render buffer)
        //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle ="pink";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // update input/data
        if (keys["a"]) {
            player.x -= 0.5;
        }

         if (keys["d"]) {
            player.x += 0.5;
        }
        // transform, render
        ctx.save();
        // transform
        ctx.translate(player.x, player.y);
        // render
        ctx.fillStyle = player.color;
        ctx.fillRect(
            -player.size / 2, // x
            -player.size / 2, // y
            player.size, // width
            player.size // heigth
        );
        ctx.restore();


        requestAnimationFrame(draw);
    }
    draw();
});