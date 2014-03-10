var circles = [];

a.addEventListener("click", function(e) {
    circles.push({
        x:e.pageX,
        y:e.pageY,
        r:1
    })
})
draw()
function draw()
{
    requestAnimationFrame(draw)
    // clear the canvas
    a.width = a.width

    // draw the circles
    for (var i = 0, n = circles.length; i < n; i++)
    {
        if (!circles[i]) break;
        c.beginPath();
        c.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2, false)
        c.stroke()
        circles[i].r++
        if (circles[i].r == 50)
        {
            circles.splice(i, 1)
            i--
        }
    }
}
