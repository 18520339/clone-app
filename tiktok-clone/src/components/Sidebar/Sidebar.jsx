import React, { useState } from 'react';
import {
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Message as MessageIcon,
    Share as ShareIcon,
} from '@material-ui/icons';
import './Sidebar.css';

export default function Sidebar({ likes, messages, shares }) {
    const [liked, setLiked] = useState(false);
    return (
        <div className='sidebar'>
            <div className='sidebar__button'>
                {liked ? (
                    <FavoriteIcon
                        fontSize='large'
                        onClick={() => setLiked(false)}
                    />
                ) : (
                    <FavoriteBorderIcon
                        fontSize='large'
                        onClick={() => setLiked(true)}
                    />
                )}
                <p>{liked ? likes + 1 : likes}</p>
            </div>
            <div className='sidebar__button'>
                <MessageIcon fontSize='large' />
                <p>{messages}</p>
            </div>
            <div className='sidebar__button'>
                <ShareIcon fontSize='large' />
                <p>{shares}</p>
            </div>
        </div>
    );
}
