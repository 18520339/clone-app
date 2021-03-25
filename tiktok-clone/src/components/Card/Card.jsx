import React, { useState, useRef } from 'react';
import './Card.css';

export default function Card({ videoUrl, children }) {
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
                playsInline
                className='card__player'
                src={videoUrl}
                ref={videoRef}
                onClick={onVideoPress}
            />
            {children}
        </div>
    );
}
