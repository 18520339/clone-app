import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import messagesRouter from './messages/messages.routes.js';

const app = express();
const connection_string = `mongodb+srv://admin:qeDfGqoGNhtWuKdR@cluster0.cdr1e.mongodb.net/messenger-clone?retryWrites=true&w=majority`;
const pusher = new Pusher({
    appId: '1178231',
    key: '6942286699e8989c1081',
    secret: '02221265e15e93d4f54a',
    cluster: 'ap1',
    useTLS: true,
});

mongoose
    .connect(connection_string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connect to MongoDB successfully');
        mongoose.connection
            .collection('messages')
            .watch()
            .on('change', change => {
                pusher.trigger('messages', 'newMessage', { change });
            });
    })
    .catch(console.error);

app.use(cors());
app.use(express.json());
app.use('/messenger', messagesRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log('App is running on port', port));
