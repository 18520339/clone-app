import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';

export default function TinderCards() {
    const [people, setPeople] = useState([
        {
            name: 'Elon Musk',
            url: 'https://i.insider.com/566eccdedd08952f058b4581',
        },
        {
            name: 'Jeff Bezos',
            url: 'https://i.insider.com/58eea6ba8af578032f8b7276',
        },
    ]);

    const onSwipe = (direction, name) => {
        console.log('Swiped ' + name);
    };

    const onCardLeftScreen = name => {
        console.log(name + ' left the screen');
    };

    return (
        <div className='tinder-cards'>
            <div className='tinder-cards__container'>
                {people.map(({ name, url }, index) => (
                    <TinderCard
                        key={index}
                        className='swipe'
                        preventSwipe={['up', 'down']}
                        onSwipe={dir => onSwipe(dir, name)}
                        onCardLeftScreen={() => onCardLeftScreen(name)}
                    >
                        <div
                            className='card'
                            style={{ backgroundImage: `url(${url})` }}
                        >
                            <h3>{name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}
