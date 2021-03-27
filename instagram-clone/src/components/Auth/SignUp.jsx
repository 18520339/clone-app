import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';

import { auth } from '../../firebase';
import PopUp from './PopUp';

export default function SignUp({ open, onClose }) {
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
            .catch(error => alert(error.message));
        onClose();
    };

    return (
        <PopUp open={open} onClose={onClose}>
            <Input
                type='text'
                name='displayName'
                value={credentials.displayName}
                onChange={onInput}
                placeholder='Display Name'
            />
            <Input
                type='text'
                name='email'
                value={credentials.email}
                onChange={onInput}
                placeholder='Email'
            />
            <Input
                type='password'
                name='password'
                value={credentials.password}
                onChange={onInput}
                placeholder='Password'
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
