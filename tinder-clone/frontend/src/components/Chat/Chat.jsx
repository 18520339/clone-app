import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import './Chat.css';

export default function Chat() {
    const param = useParams();
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Ellen',
            avatar: `https://specials-images.forbesimg.com/imageserve/5ed560d07fe4060006bbce1e/0x0.jpg`,
            text: 'Whats up',
        },
        {
            name: 'Ellen',
            avatar: `https://specials-images.forbesimg.com/imageserve/5ed560d07fe4060006bbce1e/0x0.jpg`,
            text: 'Hows it going!',
        },
        {
            text: 'Hi! How are you Ellen!',
        },
    ]);

    const onInput = event => setText(event.target.value);
    const onSubmit = event => {
        event.preventDefault();
        setMessages([...messages, { text }]);
        setText('');
    };

    return (
        <div className='chat'>
            <p className='chat__timestamp'>
                You matched with {param.person} on 10/08/2020
            </p>
            {messages.map(message => {
                return message.name ? (
                    <div className='chat__message'>
                        <Avatar
                            className='chat__avatar'
                            src={message.avatar}
                            alt={message.name}
                        />
                        <p className='chat__text'>{message.text}</p>
                    </div>
                ) : (
                    <div className='chat__message'>
                        <p className='chat__text-user'>{message.text}</p>
                    </div>
                );
            })}
            <form className='chat__input'>
                <input
                    type='text'
                    className='chat__input-field'
                    placeholder='Type a message...'
                    value={text}
                    onChange={onInput}
                />
                <button
                    type='submit'
                    className='chat__submit'
                    disabled={!text.trim()}
                    onClick={onSubmit}
                >
                    SEND
                </button>
            </form>
        </div>
    );
}
