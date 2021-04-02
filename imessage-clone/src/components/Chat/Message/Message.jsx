import React from 'react';
import { Avatar } from '@material-ui/core';

import './Message.css';

export default function Message({ id, content }) {
    return (
        <div className='message'>
            <Avatar />
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
                tenetur eum exercitationem et labore laborum neque sequi quis
                quisquam consequatur doloribus dignissimos nihil obcaecati ipsa
                dolorum cumque, libero, doloremque impedit.
            </p>
            <small>timestamp</small>
        </div>
    );
}
