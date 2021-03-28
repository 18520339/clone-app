import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';

import { database } from '../../firebase';
import './Post.css';

export default function Post({ postId, username, caption, imgUrl }) {
    const avatarApiUrl = `https://avatars.dicebear.com/v2`;
    const avatarOptions = `options[eyes][]=squint&options[eyebrow][]=raised&options[mouth][]=smile`;
    const [comment, setComments] = useState([]);

    useEffect(() => {
        database
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .onSnapshot(snapshot => {
                setComments(
                    snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() }))
                );
            });
    }, []);

    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    src={`${avatarApiUrl}/avataaars/${username}.svg?${avatarOptions}`}
                    alt='test'
                />
                <h3>{username}</h3>
            </div>
            <img className='post__image' src={imgUrl} alt='' />
            <h4 className='post__text'>
                <strong>{username}</strong> {caption}
            </h4>
        </div>
    );
}
