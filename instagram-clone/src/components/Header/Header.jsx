import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import './Header.css';

export default function Header({ auth, user, setUser }) {
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

    return (
        <div className='header'>
            <img
                width='150px'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
                alt='logo'
            />
            {user ? (
                <Button onClick={() => auth.signOut()}>Log out</Button>
            ) : (
                <div>
                    <Button onClick={() => setOpenSignIn(true)}>Log in</Button>
                    <Button onClick={() => setOpenSignUp(true)}>Sign up</Button>
                </div>
            )}
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
            <SignUp
                setUser={setUser}
                open={openSignUp}
                onClose={() => setOpenSignUp(false)}
            />
        </div>
    );
}
