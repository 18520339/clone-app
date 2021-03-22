import React, { useState } from 'react';
import firebase from 'firebase';
import database from '../../firebase';

import { IconButton, FormControl, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './InputArea.css';

export default function InputArea({ name }) {
    const [text, setText] = useState('');
    const onInput = event => setText(event.target.value);
    const onSubmit = event => {
        event.preventDefault();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        database.collection('messages').add({ name, text, timestamp });
        setText('');
    };

    return (
        <form>
            <FormControl className='form__control'>
                <Input
                    className='form__input'
                    placeholder='Enter a message...'
                    value={text}
                    onChange={onInput}
                />
                <IconButton
                    className='form__button'
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={!text.trim()}
                    onClick={onSubmit}
                >
                    <SendIcon />
                </IconButton>
            </FormControl>
        </form>
    );
}
