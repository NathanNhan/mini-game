var socket;
var Clear = document.getElementById("Clear");

function setup() {
 
    createCanvas(700, 460);
    background(255);

    socket = io.connect('http://localhost:4000/')
    socket.on('mouse', newDrawing);

}

function newDrawing(data){
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 16, 16);
}

function mouseDragged(){
    console.log('Sending: ' + mouseX + ' , ' + mouseY);

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);

    noStroke();
    fill(0);
    ellipse(mouseX, mouseY, 16, 16);
}

Clear.addEventListener("click",function(){
    var drawClear = 255;
    socket.emit('drawClear', drawClear)
})

socket.on('drawClear', function(data){
    background(data);
})

function draw() {
}


