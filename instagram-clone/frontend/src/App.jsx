import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import { auth } from './firebase';
import { Header, Post, ImageUpload } from './components';
import './App.css';

axios.defaults.baseURL = 'https://instagram-18520339.herokuapp.com';
const pusher = new Pusher('6eaf20a586091bcaa085', { cluster: 'ap1' });

export default function App() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const getPosts = () => {
        axios
            .get('/instagram/posts')
            .then(res => setPosts(res.data))
            .catch(console.error);
    };

    useEffect(() => getPosts(), []);
    useEffect(() => {
        const channel = pusher.subscribe('posts');
        channel.bind('newPost', data => getPosts());
    }, []);

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) setUser(authUser);
            else setUser(null);
        });
    }, [user]);

    return (
        <div className='App'>
            <Header auth={auth} user={user} setUser={setUser} />
            {user?.displayName ? (
                <ImageUpload username={user.displayName} />
            ) : (
                <center>
                    <h3>Login to upload</h3>
                </center>
            )}
            <div className='app__posts'>
                {posts.map(({ _id, username, caption, imgUrl }) => (
                    <Post
                        key={_id}
                        postId={_id}
                        user={user}
                        username={username}
                        caption={caption}
                        imgUrl={imgUrl}
                    />
                ))}
            </div>
        </div>
    );
}
