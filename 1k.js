// remove the canvas
d();

ctx = new AudioContext();
freq = 200
sample = ctx.sampleRate / freq
buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
data = buffer.getChannelData(0)

for (var i = 0; i < ctx.sampleRate; i++)
{
    // generate audio here
    phase = (i % sample) / sample
    data[i] = Math.sin(freq * i)
}


// add a button
btn = document.createElement("button")
btn.innerHTML = "button"
document.body.appendChild(btn)

// make something happen when the button is clicked
btn.addEventListener("click", function() {
    node = ctx.createBufferSource()
    node.buffer = buffer
    node.connect(ctx.destination)
    //node.playbackRate.value = .5
    //node.loop = true
    node.start(ctx.currentTime)
    //node.stop(ctx.currentTime + .3)
    //node.playbackRate.setValueAtTime(3, ctx.currentTime)
    //node.playbackRate.linearRampToValueAtTime(1, ctx.currentTime + .08)
})