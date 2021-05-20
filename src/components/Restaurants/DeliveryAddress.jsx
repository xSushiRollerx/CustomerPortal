import React from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tags: {
        marginTop: 8,
        marginBottom: 8
    },
});

export default function DeliveryAddress(props) {

    const style = useStyles();

    const close = () => {
        props.close(false);
    }


    return (
        <Modal open={props.open} onClose={close} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            Hey
        </Modal>
    );
}