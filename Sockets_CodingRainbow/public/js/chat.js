var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

      var goiy = document.getElementById("goiy");
      var dapandung ="";

btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

socket.on('chat', function(data){
    feedback.innerHTML = "";
    if(dapandung == data.message){
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + "<strong> Successful </strong>" + '</p>';
    }else{
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    }
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})


goiy.addEventListener("click",function(){
    
     
    var text = document.getElementById("text");
    var dapan = document.getElementById("dapan").value;
    var randoms = Math.floor(random() * dapan.length);
    // console.log(randoms);
     var results = "";
     for(i=0;i<dapan.length;i++){
        if(randoms == i){
        results += dapan[randoms];
        }else{results += " _ "}
        
    }
    text.value = results;
    dapandung = dapan;
     
    socket.emit('dapan',  {
        results: results,
        dapandung: dapandung
    });
  })

  
socket.on('dapan', function(results){
    var text = document.getElementById("text");
    dapandung = results.dapandung;
    text.value = results.results;
})