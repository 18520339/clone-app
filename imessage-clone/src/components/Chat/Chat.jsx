import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

import { Button, IconButton } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

import firebase from 'firebase';
import database, { auth } from '../../firebase';

import Message from './Message/Message';
import './Chat.css';

export default function Chat() {
    const { chatId, chatName } = useSelector(state => state.chat);
    const { uid, photoURL, email, displayName } = useSelector(
        state => state.user
    );

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const onSubmit = event => {
        event.preventDefault();
        if (!input.trim()) return;
        database.collection('chats').doc(chatId).collection('messages').add({
            uid,
            photoURL,
            email,
            displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('');
    };

    useEffect(() => {
        document
            .querySelector('#app__bottom')
            .scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (chatId)
            database
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .orderBy('timestamp')
                .onSnapshot(snapshot => {
                    setMessages(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                });
    }, [chatId]);

    return (
        <div className='chat'>
            <div className='chat__header'>
                <h4>
                    To: <span className='chat__name'>{chatName}</span>
                </h4>
                <Button onClick={() => auth.signOut()}>Sign Out</Button>
            </div>
            <div className='chat__messages'>
                <FlipMove>
                    {messages.map(({ id, data }) => (
                        <Message key={id} content={data} />
                    ))}
                </FlipMove>
                <div id='app__bottom' />
            </div>
            <div className='chat__input'>
                <form>
                    <input
                        type='text'
                        placeholder='Enter a message...'
                        value={input}
                        onChange={event => setInput(event.target.value)}
                    />
                    <IconButton
                        type='submit'
                        disabled={!input.trim()}
                        onClick={onSubmit}
                    >
                        <SendIcon />
                    </IconButton>
                </form>
            </div>
        </div>
    );
}
