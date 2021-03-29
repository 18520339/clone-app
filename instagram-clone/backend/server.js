import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import postsRouter from './posts/posts.routes.js';

const app = express();
const connection_string = `mongodb+srv://admin:qeDfGqoGNhtWuKdR@cluster0.cdr1e.mongodb.net/instagram-clone?retryWrites=true&w=majority`;
const pusher = new Pusher({
    appId: '1179521',
    key: '6eaf20a586091bcaa085',
    secret: '193fba79c7e13af19a49',
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
            .collection('posts')
            .watch()
            .on('change', change => {
                if (change.operationType === 'insert')
                    pusher.trigger('posts', 'newPost', { change });
                else console.log('Unknown trigger from Pusher');
            });
    })
    .catch(console.error);

app.use(cors());
app.use(express.json());
app.use('/instagram', postsRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log('App is running on port', port));
