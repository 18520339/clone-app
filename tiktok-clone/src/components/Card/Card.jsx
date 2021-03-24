import React, { useState, useRef } from 'react';
import './Card.css';

export default function Card({ children }) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const onVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <div className='card'>
            <video
                loop
                className='card__player'
                src='https://firebasestorage.googleapis.com/v0/b/clone-app-18520339.appspot.com/o/6933401096203275521.mp4?alt=media'
                ref={videoRef}
                onClick={onVideoPress}
            />
            {children}
        </div>
    );
}
