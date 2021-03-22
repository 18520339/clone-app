import React, { useState } from 'react';
import './App.css';

export default function App() {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    const onInput = event => setInputText(event.target.value);
    const onSubmit = event => {
        event.preventDefault();
        setMessages([...messages, inputText]);
        setInputText('');
    };

    return (
        <div className='App'>
            <form>
                <input value={inputText} onChange={onInput} />
                <button type='submit' onClick={onSubmit}>
                    Send Message
                </button>
            </form>
            {messages.map(message => (
                <p>{message}</p>
            ))}
        </div>
    );
}
