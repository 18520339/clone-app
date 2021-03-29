import React, { useState } from 'react';
import { Button, Input, LinearProgress, TextField } from '@material-ui/core';

import firebase from 'firebase';
import axios from 'axios';

import { storage, database } from '../../firebase';
import './ImageUpload.css';

export default function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const onChooseImage = ({ target }) => {
        if (!target.files[0]) return;
        setImageName(`${Date.now()}-${target.files[0].name}`);
        setImage(target.files[0]);
    };

    const onProgress = snapshot => {
        const { bytesTransferred, totalBytes } = snapshot;
        setProgress(Math.round(bytesTransferred / totalBytes) * 100);
    };

    const onComplete = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        storage
            .ref('images')
            .child(imageName)
            .getDownloadURL()
            .then(imgUrl => {
                axios.post('/instagram/posts', {
                    username,
                    caption,
                    imgUrl,
                    timestamp,
                });
                database
                    .collection('posts')
                    .add({ username, caption, imgUrl, timestamp });
                setProgress(0);
                setCaption('');
            });
    };

    const onUpload = () => {
        const uploadTask = storage.ref(`images/${imageName}`).put(image);
        uploadTask.on(
            'state_changed',
            onProgress,
            error => alert(error.message),
            onComplete
        );
    };

    return (
        <div className='image-upload'>
            <LinearProgress variant='determinate' value={progress} />
            <TextField
                label='Enter a caption...'
                variant='outlined'
                value={caption}
                onChange={event => setCaption(event.target.value)}
                multiline
            />
            <Input type='file' accept='image/*' onChange={onChooseImage} />
            <Button
                variant='contained'
                color='primary'
                onClick={onUpload}
                disabled={!image}
            >
                Upload
            </Button>
        </div>
    );
}
