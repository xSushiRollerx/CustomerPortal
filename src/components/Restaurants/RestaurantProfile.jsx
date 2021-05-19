import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import MenuCategory from './MenuCategory';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import RestaurantService from './../../services/RestaurantService';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles({
    tags: {
        marginBottom: 10
    },
    tag: {
        marginRight: 8
    },
    addressBlock: {
        marginTop: 15,
        marginBottom: 20
    },
    address: {
        marginBottom: 0,
    },
    divider: {
        marginTop: 8,
        marginBottom: 10
    }
});

export default function RestaurantProfile() {

    const style = useStyles();
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [status, setStatus] = useState(0);
    const response = () => {
        RestaurantService.getRestaurant(id).then(response => { setStatus(response.status); setRestaurant(response.data);});
    }
    useEffect(() => {
        response();
    }, []);

    

    //wait for object to be loaded and promise fulfilled   
    if (Object.entries(restaurant).length === 0 && !(status > 99) && !(status < 600)) {
        console.log(status);
        return (<h1>LOADING</h1>)
    } else {
        return <Redirect to='/login'/>
    }

    

    

    const tags =  restaurant.tags.split(',').map(tag => {
                return <Chip label={tag.trim().toLowerCase()} variant="outlined" size="small" className={style.tag} />
    });
    
    const getCategories = () => {
        let menu = restaurant.menu.sort((a, b) => a.category - b.category);
        let result = [];
        for (let i = 0; i < menu.length; i++) {
                if (i === 0 || result[result.length - 1][0].category !== menu[i].category) {
                    result.push([menu[i]]);
                   
                } else {
                    result[result.length - 1].push(menu[i]);
                }
        }
        return result;
    }

    const categories = getCategories().map(c => {
        return <MenuCategory restaurant={restaurant} category={c}/>
    })

    const pricing = () => {
        let icons = []
        for (let i = 0; i < restaurant.priceCategory; i++) {
            icons.push(1);
        }
        return icons.map((m, i) => <MonetizationOnIcon data-testid={"MonetizaitionIcon " + i} />);
    };
    
        return (
            <div data-testid="RestaurantProfile">
                <h1>RestaurantBanner</h1>
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    <h3>{restaurant.name}</h3>
                    <Grid container item direction="row" justify="flex-start">
                        {pricing()}
                    </Grid>
                    <h6>{restaurant.averageRating}</h6>
                    <Divider orientation="horizontal" flexItem className={style.divider} />
                    <Grid container direction="column" justify="flex-start" alignItems="stretch" className={style.addresssBlock}>
                        <p className={style.address}>{restaurant.streetAddress}</p>
                        <p className={style.address}>{restaurant.city}, {restaurant.state}</p>
                        <p className={style.address}>{ restaurant.zipCode}</p>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" className={style.tags}>
                        {tags}
                    </Grid>
                    <Divider orientation="horizontal" flexItem className={style.divider}/>
                    <Grid container direction="column" justify="flex-start">
                        {categories}
                    </Grid>
                </Grid>
            </div>);
}
