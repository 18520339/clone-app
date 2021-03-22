import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';

const Message = forwardRef(({ name, message }, ref) => {
    const isMe = name === message.name;
    return (
        <div ref={ref} className={`message ${isMe && 'message__me'}`}>
            <Card className={isMe ? 'message__card-me' : 'message__card'}>
                <CardContent>
                    <Typography variant='h5'>
                        {!isMe && `${message.name || 'Unknown'}: `}
                        {message.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
});
export default Message;
