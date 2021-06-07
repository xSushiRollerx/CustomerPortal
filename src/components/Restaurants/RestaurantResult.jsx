import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const useStyles = makeStyles({
    tags: {
        marginTop: 8,
        marginBottom: 8
    },
    tag: {
        marginRight: 8,
        fontSize: 12
    },
    divider: {
        marginTop: 10,
        marginBottom: 0
    },
    image: {
        textAlign: 'center',
        top: '50%',
        marginTop: 0
    },
    p: {
        margin: 0,
        fontSize: 12
    },
    card: {
        paddingLeft: 20,
        marginBottom:0
    },
    pricing: {
        fontSize: 17,
        paddingBottom: 2,
    },
    star: {
        fontSize: 16
    },
    name: {
        margin: 0
    }
});

export default function RestaurantResult(props) {

    const style = useStyles();

    const tags = props.restaurant.tags.split(',').map(tag => {
        return <Chip label={tag.trim().toLowerCase()} variant="outlined" size="small" className={style.tag} />
    });

    const pricing = () => {
        let icons = []
        for (let i = 0; i < props.restaurant.priceCategory; i++) {
            icons.push(1);
        }
        return icons.map((m, i) => <MonetizationOnIcon data-testid={"MonetizaitionIcon " + i} className={style.pricing} />);
    };

    const ratingRounded = Math.round(props.restaurant.averageRating * 2) / 2;
    const ratingStar = (star) => {
        if (ratingRounded - star >= 0) {
            return <StarIcon className={style.star} />
        } else if (star - ratingRounded=== 0.5) {
            return <StarHalfIcon className={style.star} />
        } else {
            return <StarBorderIcon className={style.star} />
        }
    }

    const rating = () => {
        let starOne = ratingStar(1);
        let starTwo = ratingStar(2);
        let starThree = ratingStar(3);
        let starFour = ratingStar(4);
        let starFive = ratingStar(5);

        return (
            <Grid item className={style.tags}>
                <Grid container direction="row" justify="flex-start" spacing={1}>
                    {starOne}
                    {starTwo}
                    {starThree}
                    {starFour}
                    {starFive}
                </Grid>
            </Grid>
            
            );
    }

    return (
        <Grid item xs={12} className={style.card}>
            <Grid container direction="row" justify="flex-start" xs={12}>
                <Grid container item justify="center" alignItems="center" xs={4}>Image</Grid>
                <Grid item>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch">
                        <a href={"/restaurant/" + props.restaurant.id}><h6 className={style.name}>{props.restaurant.name}</h6></a>
                        {rating()}
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                {pricing()}
                            </Grid>
                        </Grid>
                        <Grid item className={style.tags}>
                            <Grid container direction="row" justify="flex-start" spacing={1}>
                                {tags}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider orientation="horizontal" flexItem className={style.divider} />
        </Grid>
        );
}