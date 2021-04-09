const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect(`/${uuidv4()}`));
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

const port = process.env.PORT || 7000;
server.listen(port, () => console.log('App is running on port', port));
