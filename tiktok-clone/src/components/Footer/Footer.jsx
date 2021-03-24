import React from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from 'react-ticker';
import './Footer.css';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer__text'>
                <h3>@fantastic.vn</h3>
                <p>abc</p>
                <MusicNoteIcon />
                <Ticker mode='smooth'>{({ index }) => <h1>abcdef</h1>}</Ticker>
            </div>
            <img
                className='footer__record'
                src='https://static.thenounproject.com/png/934821-200.png'
                alt=''
            />
        </div>
    );
}
