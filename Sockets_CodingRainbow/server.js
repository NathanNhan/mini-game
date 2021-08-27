var express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');

var app = express();
var server = app.listen(4000);

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

//  mở node: npm start 

console.log("My socket server is running ");
console.log("http://localhost:4000/");

app.get('/', async (req, res) => {
    res.render('index')
});

app.get('/Sockets', async (req, res) => {
    res.render('Sockets')
});


var socket = require('socket.io');

var io = socket(server);


io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('Socket connection: ' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
        // io.sockets.emit('mouse', data);
        //console.log(data);
    }

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    });

    socket.on('dapan', function(results){
        console.log("data results: " + results.results)
        socket.broadcast.emit('dapan', results);
    });

    socket.on('drawClear', function(data){
        io.sockets.emit('drawClear', data);
    });
}
