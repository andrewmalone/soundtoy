var circles = [];
var e = new AudioContext();
var freq = 440;
var sample = e.sampleRate / freq;
var buffer = e.createBuffer(1, e.sampleRate, e.sampleRate);
var data = buffer.getChannelData(0);

a.addEventListener("click", function(ev) {
    play();
    circles.push({
        x:ev.pageX,
        y:ev.pageY,
        r:1,
        n:0,
        nn:e.currentTime
    });
});

function play()
{
    for (i = 0; i < 5; i++)
    {
        var time = i;
        var n = e.createBufferSource();
        var amp = e.createGain();
        n.buffer = buffer;
        n.connect(amp);
        amp.connect(e.destination);
        n.start(e.currentTime + time);
        amp.gain.setValueAtTime(1 - i/5, e.currentTime + time);
        amp.gain.linearRampToValueAtTime(0,time + e.currentTime + 1);
    }
}

// set up the 1 second sine wave audio buffer
for (var i = 0; i < e.sampleRate; i++)
{
    phase = (i % sample) / sample;
    data[i] = Math.sin(phase * Math.PI * 2);
}

draw();


function draw()
{
    requestAnimationFrame(draw);
    // clear the canvas
    a.width = a.width;

    // draw the circles
    for (var i = 0, n = circles.length; i < n; i++)
    {
        var x = circles[i];
        if (!x) break;
        if (x.nn < e.currentTime)
        {
            c.beginPath();
            c.arc(x.x, x.y, x.r, 0, Math.PI * 2);
            var alpha = 1 - (x.r / 10);
            c.strokeStyle = "rgba(0,0,0,"+alpha+")";
            c.stroke();
            x.r+=1;
            if (x.r >= 10)
            {
                if (x.n < 4)
                {
                    x.r = 0;
                    x.n++;
                    x.nn+=1;
                }
                else
                {
                    circles.splice(i--, 1);
                }
            }
        }
    }
}
