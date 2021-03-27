import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: '50%',
        maxWidth: 500,
        padding: '20px 30px 10px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
    },
    popUp: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: '15px 0px',
        },
    },
}));

export default function PopUp({ open, onClose, children }) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    return (
        <Modal open={open} onClose={onClose}>
            <div style={modalStyle} className={classes.paper}>
                <center>
                    <img
                        width='45%'
                        src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
                        alt='logo'
                    />
                </center>
                <form className={classes.popUp}>{children}</form>
            </div>
        </Modal>
    );
}
