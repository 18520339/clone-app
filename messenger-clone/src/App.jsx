import React, { useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';
import database from './firebase';

import { Message, InputArea } from './components';
import './App.css';

export default function App() {
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => setName(prompt('Please enter your name')), []);
    useEffect(() => {
        document
            .querySelector('#app__bottom')
            .scrollIntoView({ behavior: 'smooth' });
    }, [name, messages]);

    useEffect(() => {
        database
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot(snapshot => {
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        message: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <div className='App'>
            <div className='app__title'>
                <img
                    src='https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=45&h=45'
                    alt='logo'
                />
                <h1>&ensp;Welcome {name}!</h1>
            </div>
            <FlipMove className='app__messages'>
                {messages.map(({ id, message }) => (
                    <Message key={id} name={name} message={message} />
                ))}
                <div id='app__bottom' />
            </FlipMove>
            <InputArea name={name} />
        </div>
    );
}
