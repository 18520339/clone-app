import React from 'react';
import Inbox from './Inbox';

export default function Inboxes() {
    return (
        <div className='chats'>
            <Inbox
                avatar='https://specials-images.forbesimg.com/imageserve/5ed560d07fe4060006bbce1e/0x0.jpg'
                name='Ellen'
                message='Whats Up?'
                timestamp='55 minutes ago'
            />
            <Inbox
                avatar='https://admin.euro.savills.co.uk/_images/landscape-profile-images/sarah.mallard.jpg'
                name='sarah'
                message='Hey! how are you'
                timestamp='35 minutes ago'
            />
        </div>
    );
}
