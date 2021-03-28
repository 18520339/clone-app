import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { auth } from '../../firebase';
import PopUp from './PopUp';

export default function SignIn({ open, onClose }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const onInput = event => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const onSubmit = event => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).catch(error => alert(error.message));
        onClose();
    };

    return (
        <PopUp open={open} onClose={onClose}>
            <TextField
                type='text'
                name='email'
                label='Email'
                placeholder='email@domain.com'
                variant='outlined'
                value={credentials.email}
                onChange={onInput}
            />
            <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Password'
                variant='outlined'
                value={credentials.password}
                onChange={onInput}
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={onSubmit}
            >
                Log in
            </Button>
        </PopUp>
    );
}
