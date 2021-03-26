import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, Sidebar, Footer } from './components';
import './App.css';

axios.defaults.baseURL = 'https://tiktok-18520339.herokuapp.com';
export default function App() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        axios
            .get('/tiktok/videos')
            .then(res => setVideos(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className='App'>
            <div className='app__videos'>
                {videos.map(
                    ({
                        _id,
                        url,
                        channel,
                        description,
                        song,
                        likes,
                        messages,
                        shares,
                    }) => (
                        <Card key={_id} videoUrl={url}>
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
