import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { database, auth } from './firebase';

import { SignIn, SignUp, Post } from './components';
import './App.css';

export default function App() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) setUser(authUser);
            else setUser(null);
        });
    }, []);

    useEffect(() => {
        database.collection('posts').onSnapshot(snapshot => {
            setPosts(
                snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() }))
            );
        });
    }, []);

    return (
        <div className='App'>
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
            <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
            <div className='app__header'>
                <img
                    src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
                    alt='logo'
                />
            </div>
            {user ? (
                <Button onClick={() => auth.signOut()}>Log out</Button>
            ) : (
                <div className='app__login-container'>
                    <Button onClick={() => setOpenSignIn(true)}>Log in</Button>
                    <Button onClick={() => setOpenSignUp(true)}>Sign up</Button>
                </div>
            )}
            {posts.map(({ id, post: { username, caption, imgUrl } }) => (
                <Post
                    key={id}
                    username={username}
                    caption={caption}
                    imgUrl={imgUrl}
                />
            ))}
        </div>
    );
}
