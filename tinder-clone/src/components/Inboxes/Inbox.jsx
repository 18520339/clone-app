import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import './Inbox.css';

export default function ChatRow({ name, message, avatar, timestamp }) {
    return (
        <Link to={`/chat/${name}`}>
            <div className='inbox'>
                <Avatar className='inbox__avatar' src={avatar} alt={name} />
                <div className='inbox__details'>
                    <h2>{name}</h2>
                    <p>{message}</p>
                </div>
                <p className='inbox__timestamp'>{timestamp}</p>
            </div>
        </Link>
    );
}
