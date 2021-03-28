import React, { useState, useEffect } from 'react';
import { database, auth } from './firebase';
import { Header, Post, ImageUpload } from './components';
import './App.css';

export default function App() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) setUser(authUser);
            else setUser(null);
        });
    }, [user]);

    useEffect(() => {
        database
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(
                    snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() }))
                );
            });
    }, []);

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
                {posts.map(({ id, post: { username, caption, imgUrl } }) => (
                    <Post
                        key={id}
                        postId={id}
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
