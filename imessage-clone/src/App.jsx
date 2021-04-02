import React, { useEffect } from 'react';
import { auth } from './firebase';

import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/userSlice';

import { Login, Sidebar, Chat } from './components';
import './App.css';

export default function App() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                const { uid, photoURL, email, displayName } = authUser;
                dispatch(login({ uid, photoURL, email, displayName }));
            } else dispatch(logout());
        });
    }, [dispatch]);

    if (!user) return <Login />;
    return (
        <div className='app'>
            <Sidebar />
            <Chat />
        </div>
    );
}
