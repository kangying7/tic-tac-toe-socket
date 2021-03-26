const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

const message_notification = "notification message";

var current_user;

io.on('connection', (socket) => {
	socket.on('username', (username) =>{
		current_user = username;
		io.emit(message_notification, `${current_user} has connected`)
	})	
	
	socket.on('chat message', chat_message => {
		// io.emit('chat message', msg);
		io.emit('chat message', {username: chat_message.username, message: chat_message.message});
		// console.log('chat message' + msg)
	});

	socket.on('disconnect', msg => {
		io.emit(message_notification, `${current_user} has disconnected`)
	})
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
