import React from 'react';
import Button from '@material-ui/core/Button';
import { auth, provider } from '../../firebase';
import './Login.css';

export default function Login() {
    const onSubmit = () => {
        auth.signInWithRedirect(provider).catch(console.error);
    };
    return (
        <div className='login'>
            <div className='login__logo'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png'
                    alt='iMessage logo'
                />
                <h1>iMessage</h1>
            </div>
            <Button variant='contained' color='primary' onClick={onSubmit}>
                Sign In
            </Button>
        </div>
    );
}
