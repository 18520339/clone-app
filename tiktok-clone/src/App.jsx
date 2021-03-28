import React, { useState, useEffect } from 'react';
import database from './firebase';

import { Card, Sidebar, Footer } from './components';
import './App.css';

export default function App() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        database.collection('videos').onSnapshot(snapshot => {
            setVideos(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    video: doc.data(),
                }))
            );
        });
    }, []);

    return (
        <div className='App'>
            <div className='app__videos'>
                {videos.map(
                    ({
                        id,
                        video: {
                            url,
                            channel,
                            description,
                            song,
                            likes,
                            messages,
                            shares,
                        },
                    }) => (
                        <Card key={id} videoUrl={url}>
                            <Sidebar
                                likes={likes}
                                messages={messages}
                                shares={shares}
                            />
                            <Footer
                                channel={channel}
                                description={description}
                                song={song}
                            />
                        </Card>
                    )
                )}
            </div>
        </div>
    );
}
