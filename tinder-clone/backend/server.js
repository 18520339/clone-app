import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cardsRouter from './cards/cards.routes.js';

const app = express();
const connection_string = `mongodb+srv://admin:***REMOVED***@cluster0.cdr1e.mongodb.net/tinder-clone?retryWrites=true&w=majority`;
mongoose
    .connect(connection_string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connect to MongoDB successfully'))
    .catch(console.error);

app.use(cors());
app.use(express.json());
app.use('/tinder', cardsRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log('App is running on port', port));
