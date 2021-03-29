import React, { useState, useEffect } from 'react';
import { Avatar, Button, TextField } from '@material-ui/core';
import firebase from 'firebase';

import { database } from '../../firebase';
import './Post.css';

export default function Post({ postId, user, username, caption, imgUrl }) {
    const avatarApiUrl = `https://avatars.dicebear.com/v2`;
    const avatarOptions = `options[eyes][]=squint&options[eyebrow][]=raised&options[mouth][]=smile`;

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const onComment = event => {
        event.preventDefault();
        database.collection('posts').doc(postId).collection('comments').add({
            username: user.displayName,
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    };

    useEffect(() => {
        database
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .onSnapshot(snapshot => {
                setComments(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        comment: doc.data(),
                    }))
                );
            });
    }, [postId]);

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
            <h4 className='post__text'>{caption}</h4>
            <img className='post__image' src={imgUrl} alt={username} />
            <div className='post__comments'>
                {comments.map(({ id, comment: { username, text } }) => (
                    <p key={id}>
                        <strong>{username}</strong> {text}
                    </p>
                ))}
            </div>
            {user && (
                <form className='post__comment-box'>
                    <TextField
                        type='text'
                        className='post__input'
                        placeholder='Add a comment...'
                        variant='outlined'
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                        size='small'
                    />
                    <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        onClick={onComment}
                        disabled={!comment}
                    >
                        Post
                    </Button>
                </form>
            )}
        </div>
    );
}
