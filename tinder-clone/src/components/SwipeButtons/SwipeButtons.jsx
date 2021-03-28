import React from 'react';
import './SwipeButtons.css';

import IconButton from '@material-ui/core/IconButton';
import {
    Replay as ReplayIcon,
    Close as CloseIcon,
    StarRate as StarRateIcon,
    Favorite as FavoriteIcon,
    FlashOn as FlashOnIcon,
} from '@material-ui/icons';

export default function SwipeButtons() {
    return (
        <div className='swipe-buttons'>
            <IconButton className='swipe-buttons__repeat'>
                <ReplayIcon fontSize='large' />
            </IconButton>
            <IconButton className='swipe-buttons__left'>
                <CloseIcon fontSize='large' />
            </IconButton>
            <IconButton className='swipe-buttons__star'>
                <StarRateIcon fontSize='large' />
            </IconButton>
            <IconButton className='swipe-buttons__right'>
                <FavoriteIcon fontSize='large' />
            </IconButton>
            <IconButton className='swipe-buttons__lightning'>
                <FlashOnIcon fontSize='large' />
            </IconButton>
        </div>
    );
}
