import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, IconButton } from '@material-ui/core';
import {
    RateReviewOutlined as RateReviewOutlinedIcon,
    Search as SearchIcon,
} from '@material-ui/icons';

import database, { auth } from '../../firebase';
import Inbox from './Inbox/Inbox';
import './Sidebar.css';

export default function Sidebar() {
    const user = useSelector(state => state.user);
    const [chats, setChats] = useState([]);

    const onAddChat = () => {
        const chatName = prompt('Please enter a chat name');
        if (chatName) database.collection('chats').add({ chatName });
    };

    useEffect(() => {
        database.collection('chats').onSnapshot(snapshot => {
            setChats(
                snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
            );
        });
    }, []);

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar
                    className='sidebar__header-avatar'
                    src={user.photoURL}
                    onClick={() => auth.signOut()}
                />
                <div className='sidebar__header-search'>
                    <SearchIcon />
                    <input type='text' placeholder='Search' />
                </div>
                <IconButton className='sidebar__icon-button' variant='outlined'>
                    <RateReviewOutlinedIcon onClick={onAddChat} />
                </IconButton>
            </div>
            <div className='sidebar__inboxes'>
                {chats.map(({ id, data: { chatName } }) => (
                    <Inbox key={id} id={id} name={chatName} />
                ))}
            </div>
        </div>
    );
}
