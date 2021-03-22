import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './Message.css';

export default function Message({ name, message }) {
    const isMe = name === message.name;
    return (
        <div className={`message ${isMe && 'message__me'}`}>
            <Card className={isMe ? 'message__card-me' : 'message__card'}>
                <CardContent>
                    <Typography color='inherit' variant='h5' component='h2'>
                        {message.name}: {message.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
