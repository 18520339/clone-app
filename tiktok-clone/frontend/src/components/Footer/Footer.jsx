import React from 'react';
import Ticker from 'react-ticker';
import './Footer.css';

export default function Footer({ channel, description, song }) {
    return (
        <div className='footer'>
            <div className='footer__text'>
                <h4>@{channel}</h4>
                <p>{description}</p>
                <div className='footer__ticker'>
                    <img
                        className='footer__record'
                        src='https://static.thenounproject.com/png/934821-200.png'
                        alt=''
                    />
                    <Ticker mode='smooth'>
                        {({ index }) => <p>{song}</p>}
                    </Ticker>
                </div>
            </div>
        </div>
    );
}
