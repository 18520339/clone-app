import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { auth } from '../../firebase';
import PopUp from './PopUp';

export default function SignUp({ setUser, open, onClose }) {
    const [credentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
    });

    const onInput = event => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const onSubmit = event => {
        event.preventDefault();
        const { displayName, email, password } = credentials;
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => authUser.user.updateProfile({ displayName }))
            .then(authUser => setUser(authUser))
            .catch(error => alert(error.message));
        onClose();
    };

    return (
        <PopUp open={open} onClose={onClose}>
            <TextField
                type='text'
                name='displayName'
                label='Username'
                placeholder='Username'
                variant='outlined'
                value={credentials.displayName}
                onChange={onInput}
            />
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
                Sign up
            </Button>
        </PopUp>
    );
}
