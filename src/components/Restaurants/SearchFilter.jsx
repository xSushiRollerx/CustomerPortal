import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
        marginBottom: 10
    },
    image: {
        textAlign: 'center',
        top: '50%',
        marginTop: 0
    },
    p: {
        margin: 0,
        fontSize: 14
    },
    card: {
        paddingRight: 20,
        marginBottom: 0
    },
    rating: {
        width: 120
    },
    ratingButton: {
        border: 0,
        padding: 0
    },
    ratingStar: {
        fontSize: 16
    },
    andUp: {
        fontSize: 12,
        margin: 0,
        paddingTop: 4
    }

});

export default function SearchFilter(props) {

    const style = useStyles();
    const [state, setState] = React.useState({
        cheap: false,
        mid: false,
        fine: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { cheap, mid, fine } = state;

    const fiveStars = () => {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item>
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                </Grid>
                
                <Grid item>
                    <p className={style.andUp}> & UP</p>
                </Grid>
                </Grid>
            );
    }

    const fourStars = () => {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item>
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                </Grid>

                <Grid item>
                    <p className={style.andUp}> & UP</p>
                </Grid>
            </Grid>
        );
    }

    const threeStars = () => {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item>
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                </Grid>

                <Grid item>
                    <p className={style.andUp}> & UP</p>
                </Grid>
            </Grid>
        );
    }

    const twoStars = () => {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item>
                    <StarIcon className={style.ratingStar} />
                    <StarIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                </Grid>

                <Grid item>
                    <p className={style.andUp}> & UP</p>
                </Grid>
            </Grid>
        );
    }

    const oneStar = () => {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item>
                    <StarIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                    <StarBorderIcon className={style.ratingStar} />
                </Grid>

                <Grid item>
                    <p className={style.andUp}> & UP</p>
                </Grid>
            </Grid>
        );
    }


    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch" className={style.card}>
            <h5>Location</h5>
            <p className={style.p}>1234 Main St</p>
            <p className={style.p}>Principal, GX</p>
            <p className={style.p}>67890</p>
            <Divider orientation="horizontal" flexItem className={style.divider} />
            <Grid item xs={12}>
                <Grid direction="column" justify="flex-start" alignItems="stretch" container>
                    <h5>Price Category</h5>
                    <FormControl>
                        <FormControlLabel
                            control={<Checkbox checked={cheap} color="black" icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />} onChange={handleChange} name="cheap" />}
                            label="Cheap Eats"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={mid} color="black"  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />} onChange={handleChange} name="mid" />}
                            label="Mid Range"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={fine} color="black"  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />} onChange={handleChange} name="fine" />}
                            label="Fine Dining"
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Divider orientation="horizontal" flexItem className={style.divider} />
            <h5>Rating</h5>
            <Button
                color="black"
                size="small"
            > 
                {fiveStars()}
            </Button>
            <Button
                color="black"
                size="small"
            >
                {fourStars()}
            </Button>
            <Button
                color="black"
                size="small"
            >
                {threeStars()}
            </Button>
            <Button
                color="black"
                size="small"
            >
                {twoStars()}
            </Button>
            <Button
                color="black"
                size="small"
            >
                {oneStar()}
            </Button>
        </Grid>
    );
}