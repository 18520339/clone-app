const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, { debug: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/peerjs', peerServer);

app.get('/', (req, res) => res.redirect(`/${uuidv4()}`));
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
    socket.on('JOIN_ROOM', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('NEW_USER', userId);
    });
});

const port = process.env.PORT || 7000;
server.listen(port, () => console.log('App is running on port', port));
