import React, { useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';

import axios from 'axios';
import Pusher from 'pusher-js';

import { Message, InputArea } from './components';
import './App.css';

axios.defaults.baseURL = 'https://messenger-18520339.herokuapp.com';
const pusher = new Pusher('6942286699e8989c1081', { cluster: 'ap1' });

export default function App() {
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const getMessages = () => {
        axios
            .get('/messenger/messages')
            .then(res => setMessages(res.data))
            .catch(console.error);
    };

    useEffect(() => setName(prompt('Please enter your name')), []);
    useEffect(() => {
        document
            .querySelector('#app__bottom')
            .scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => getMessages(), []);
    useEffect(() => {
        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', data => getMessages());
    }, [name]);

    return (
        <div className='App'>
            <div className='app__title'>
                <img
                    src='https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=45&h=45'
                    alt='logo'
                />
                <h1>&ensp;Welcome {name}!</h1>
            </div>
            <div className='app__messages'>
                <FlipMove>
                    {messages.map(message => (
                        <Message
                            key={message._id}
                            name={name}
                            message={message}
                        />
                    ))}
                </FlipMove>
                <div id='app__bottom' />
            </div>
            <InputArea name={name} />
        </div>
    );
}
