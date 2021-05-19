import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import ControlPoint from '@material-ui/icons/ControlPoint';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        top: '33%',
        left: '33%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    addNumber: {
        width: 80,
        marginBottom: 10

	}
}));

export default function MenuItem(props) {
    const style = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log(props.item.summary);
    return(
          
            <Grid container item alignItems="center" alignItems="stretch" xs={6}>
            <Card variant="outlined" >
                    <CardContent>
                        <Grid container direction="row" alignItems="stretch" justify="flex-start">
                            <Grid container item justify="center" alignItems="center" xs={4}>Image</Grid>
                            <Grid container item direction="column" justify="flex-start" alignItems="stretch" xs={7}>
                                <h6>{props.item.name}</h6>
                                <p>{props.item.summary}</p>
                                <p>${props.item.cost}</p>
                            </Grid>
                            <Grid container item justify="center" alignItems="center" xs={1}>
                            <IconButton aria-label="Add Food To Cart" fontSize="large" onClick={handleOpen}>
                                    <ControlPoint />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
                <Card variant="outlined">
                    <CardContent className={style.paper}>
                            <Grid container item justify="center" alignItems="center" >Image</Grid>
                            <Grid container item justify="flex-start" alignItems="stretch" >
                                <h6>{props.item.name}</h6>
                                <p>asdkla asldksdl asas asddkjkasd lkksd asdlk asd asdjkdn asdnkssd djkansd</p>
                                <p>$XX.XX</p>
                            </Grid>
                            <Grid container item direction="column" justify="center" alignItems="center">
                            <TextField id="standard-number" type="number" className={style.addNumber} variant="filled" size="small" label="Quantity"/>
                            <Button aria-label="Add Food To Cart" fontSize="large" variant="outlined" onClick={handleClose}>Add To Basket</Button>
                            </Grid>
                    </CardContent>
                </Card>
            </Modal>

             </Grid>
            
   );
}