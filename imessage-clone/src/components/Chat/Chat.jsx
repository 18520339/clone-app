import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { MicNone as MicNoneIcon } from '@material-ui/icons';

import Message from './Message/Message';
import './Chat.css';

export default function Chat() {
    const [text, setText] = useState('');
    const onSubmit = event => {
        event.preventDefault();
        setText('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <h4>
                    To: <span className='chat__name'>Channel Name</span>
                </h4>
                <strong>Details</strong>
            </div>
            <div className='chat__messages'>
                <Message />
                <Message />
                <Message />
            </div>
            <div className='chat__input'>
                <form>
                    <input
                        type='text'
                        placeholder='Enter a message...'
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                    <button onClick={onSubmit} />
                </form>
                <IconButton>
                    <MicNoneIcon className='chat__mic' />
                </IconButton>
            </div>
        </div>
    );
}
