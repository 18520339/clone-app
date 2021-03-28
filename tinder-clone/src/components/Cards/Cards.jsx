import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import database from '../../firebase';
import './Cards.css';

export default function Cards() {
    const [people, setPeople] = useState([]);
    const onSwipe = (direction, name) => console.log('Swiped ' + name);
    const onCardLeftScreen = name => console.log(name + ' left the screen');

    useEffect(() => {
        database.collection('people').onSnapshot(snapshot => {
            setPeople(snapshot.docs.map(doc => doc.data()));
        });
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
