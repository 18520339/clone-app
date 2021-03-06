const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect(`/${uuidv4()}`));
app.get('/:room', (req, res) => {
	res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
	socket.on('JOIN_ROOM', (roomId, userId) => {
		socket.join(roomId);
		socket.broadcast.to(roomId).emit('NEW_USER', userId);
		socket.on('MESSAGE_TO_SERVER', message => {
			io.to(roomId).emit('MESSAGE_TO_CLIENT', message);
		});
		socket.on('disconnect', () => {
			socket.broadcast.to(roomId).emit('USER_LEAVE', userId);
		});
	});
});
server.listen(process.env.PORT || 7000);
