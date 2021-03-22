import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import { Message } from './components';
import database from './firebase';
import './App.css';

export default function App() {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([{ name: '', text: '' }]);

    const onInput = event => setText(event.target.value);
    const onSubmit = event => {
        event.preventDefault();
        setMessages([...messages, { name, text }]);
        setText('');
    };
    useEffect(() => setName(prompt('Please enter your name')), []);
    useEffect(() => {
        database.collection('messages').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()).reverse());
        });
    }, []);

    return (
        <div className='App'>
            <h2>Welcome {name}</h2>
            <form>
                <FormControl>
                    <InputLabel>Enter a message...</InputLabel>
                    <Input value={text} onChange={onInput} />
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={!text.trim()}
                        onClick={onSubmit}
                    >
                        Send Message
                    </Button>
                </FormControl>
            </form>
            {messages.map((message, index) => (
                <Message key={index} name={name} message={message} />
            ))}
        </div>
    );
}
