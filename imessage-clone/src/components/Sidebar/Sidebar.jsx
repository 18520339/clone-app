import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {
    RateReviewOutlined as RateReviewOutlinedIcon,
    Search as SearchIcon,
} from '@material-ui/icons';

import { useSelector, useDispatch } from 'react-redux';
import { setChat } from '../../redux/chatSlice';

import database from '../../firebase';
import Inbox from './Inbox/Inbox';
import './Sidebar.css';

export default function Sidebar() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [inboxes, setInboxes] = useState([]);
    const onAddChat = () => {
        const chatName = prompt('Please enter a chat name');
        if (chatName) database.collection('chats').add({ chatName });
    };

    useEffect(() => {
        database.collection('chats').onSnapshot(snapshot => {
            if (snapshot.docs[0])
                dispatch(
                    setChat({
                        chatId: snapshot.docs[0].id,
                        chatName: snapshot.docs[0].data().chatName,
                    })
                );
            setInboxes(
                snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
            );
        });
    }, [dispatch]);

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar
                    className='sidebar__header-avatar'
                    src={user.photoURL}
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
                {inboxes.map(({ id, data: { chatName } }) => (
                    <Inbox key={id} id={id} name={chatName} />
                ))}
            </div>
        </div>
    );
}
