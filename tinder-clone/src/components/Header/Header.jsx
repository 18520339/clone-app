import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';

import IconButton from '@material-ui/core/IconButton';
import {
    ArrowBack as ArrowBackIcon,
    Person as PersonIcon,
    Forum as ForumIcon,
} from '@material-ui/icons';

export default function Header({ back }) {
    const history = useHistory();
    return (
        <div className='header'>
            {back ? (
                <IconButton onClick={() => history.replace(back)}>
                    <ArrowBackIcon fontSize='large' className='header__icon' />
                </IconButton>
            ) : (
                <IconButton>
                    <PersonIcon fontSize='large' className='header__icon' />
                </IconButton>
            )}
            <Link to='/'>
                <img
                    className='header__logo'
                    src='https://phongvu.vn/cong-nghe/wp-content/uploads/2018/09/tinder-logo.png'
                    alt=''
                />
            </Link>
            <Link to='/chat'>
                <IconButton>
                    <ForumIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
        </div>
    );
}
