var app = require('express')();
var fs=require("fs")
var http = require('http').Server(app);
var io=require('socket.io')(http);
// var filePath=__dirname+"/HomeScreen.txt";
var filePath=__dirname+"/details.json";
// app.use(cors({credentials: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8888");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function(req, res){
  res.sendFile(__dirname+'/'+'index.html');
});

app.get('/getData', function(req, res){
  res.sendFile(filePath);
});
var clients=0;
//On connection
io.on('connection',function(socket){
	clients++;
console.log(clients+' User(s) connected');
// var filePath=__dirname+"/HomeScreen.txt";
var data = fs.readFileSync(filePath);

// var data='';
var output=clients+' User(s) connected\n'+data;;
fs.watchFile(filePath, function() {
    console.log('File Changed ...');
    data = fs.readFileSync(filePath);
    console.log('File content at : ' + new Date() + ' is \n' + data);
    output=clients+' User(s) connected\n'+data;
    socket.broadcast.emit('newclient', {description:output
});
});

// socket.emit('newclient', function(){
// 	console.log('inside emit');
// 	var msg={
// 		description:'Hey, Hello!'
// 	};
// 	return msg
// });

console.log('Output variable is =============='+output);
socket.emit('newclient', {description:'Hey, Hello!'
});
socket.broadcast.emit('newclient', {description:output
});
// //Send a message after a timeout of 4seconds
//   setTimeout(function(){
//     socket.emit('myEvent',{description:'Sent a message 4seconds after connection!'});
//   }, 4000);


//On disconnection
socket.on('disconnect', function(){
	clients--;
	var output=clients+' User(s) connected\n'+data;
	socket.broadcast.emit('newclient', {description:output
});
	console.log('User disconnected');
});
});

http.listen(8089, function(){
  console.log('listening on *:8089');
});