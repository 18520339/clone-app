import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import './Cards.css';

// axios.defaults.baseURL = `http://localhost:7000`;
export default function Cards() {
    const [people, setPeople] = useState([]);
    const onSwipe = (direction, name) => console.log('Swiped ' + name);
    const onCardLeftScreen = name => console.log(name + ' left the screen');

    useEffect(() => {
        axios
            .get('/tinder/cards')
            .then(res => setPeople(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className='tinder-cards'>
            <div className='tinder-cards__container'>
                {people.map(({ name, imgUrl }, index) => (
                    <TinderCard
                        key={index}
                        className='swipe'
                        preventSwipe={['up', 'down']}
                        onSwipe={dir => onSwipe(dir, name)}
                        onCardLeftScreen={() => onCardLeftScreen(name)}
                    >
                        <div
                            className='card'
                            style={{ backgroundImage: `url(${imgUrl})` }}
                        >
                            <h3>{name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}
