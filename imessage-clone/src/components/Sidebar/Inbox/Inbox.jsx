import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Inbox.css';

export default function Inbox({ id, name }) {
    return (
        <div className='inbox'>
            <Avatar />
            <div className='inbox__info'>
                <h3>{name}</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores aut explicabo, accusamus, molestias temporibus omnis
                    ab voluptates aperiam nihil totam doloremque nam velit fuga
                    illo, quia distinctio perspiciatis repudiandae nesciunt.
                </p>
                <small>timestamp</small>
            </div>
        </div>
    );
}
