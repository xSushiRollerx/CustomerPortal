import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from './FoodItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    divider: {
        marginBottom: 10,
        marginTop: 20
    },
});

export default function MenuCategory(props) {

    const style = useStyles();
    let food = props.category.map(m => {
        if (m.isActive === 1) {
            return <MenuItem restaurant={props.restaurant} item={m} />
        }
    }); 

    return (
            <Grid container direction="column" justify="flex-start" alignItems="stretch" >
            <h3>{props.category[0].category}</h3>
            <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={4}>
                {food}
                </Grid>
            <Divider orientation="horizontal" flexItem className={style.divider } />
            </Grid>);
}