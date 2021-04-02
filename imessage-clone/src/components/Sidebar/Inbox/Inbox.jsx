import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import * as timeago from 'timeago.js';

import { useDispatch } from 'react-redux';
import { setChat } from '../../../redux/chatSlice';

import database from '../../../firebase';
import './Inbox.css';

export default function Inbox({ id, name }) {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        database
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()));
            });
    }, [id]);

    return (
        <div
            className='inbox'
            onClick={() => dispatch(setChat({ chatId: id, chatName: name }))}
        >
            <Avatar src={messages[0]?.photoURL} />
            <div className='inbox__info'>
                <h3>{name}</h3>
                <p>{messages[0]?.message}</p>
                <small>
                    {timeago.format(new Date(messages[0]?.timestamp?.toDate()))}
                </small>
            </div>
        </div>
    );
}
