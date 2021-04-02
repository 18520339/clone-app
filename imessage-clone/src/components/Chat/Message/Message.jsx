import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import * as timeago from 'timeago.js';
import './Message.css';

const Message = forwardRef(({ content }, ref) => {
    const { photoURL, email, message, timestamp } = content;
    const user = useSelector(state => state.user);

    return (
        <div
            className={`message ${user.email === email && 'message__me'}`}
            ref={ref}
        >
            {user.email !== email && (
                <Avatar className='message__photo' src={photoURL} />
            )}
            <p>{message}</p>
            <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
        </div>
    );
});
export default Message;
