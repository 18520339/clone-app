import React from 'react';
import { Avatar } from '@material-ui/core';
import './Post.css';

export default function Post({ username, caption, imgUrl }) {
    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar className='post__avatar' src='' alt='test' />
                <h3>{username}</h3>
            </div>
            <img className='post__image' src={imgUrl} alt='' />
            <h4 className='post__text'>
                <strong>{username}</strong> {caption}
            </h4>
        </div>
    );
}
