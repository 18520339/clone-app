import React, { useState, useEffect } from 'react';
import { Card, Sidebar, Footer } from './components';
import database from './firebase';
import './App.css';

export default function App() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        database.collection('videos').onSnapshot(snapshot => {
            setVideos(snapshot.docs.map(doc => doc.data()));
        });
    }, []);

    return (
        <div className='app'>
            <div className='app__videos'>
                {videos.map(
                    ({
                        url,
                        channel,
                        description,
                        song,
                        likes,
                        messages,
                        shares,
                    }) => (
                        <Card key={url} videoUrl={url}>
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
