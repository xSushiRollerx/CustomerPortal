import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import MenuCategory from './MenuCategory';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import RestaurantService from './../../services/RestaurantService';

const useStyles = makeStyles({
    tags: {
        marginBottom: 10
    },
    tag: {
        marginRight: 8
    },
    address: {
        marginBottom: 0,
    },
});

export default function RestaurantProfile() {

    const style = useStyles();
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const response = () => {
        RestaurantService.getRestaurant(id).then(response => { console.log(response.data); setRestaurant(response.data); });
    }
    useEffect(() => {
        response();
    }, []) 


    console.log(restaurant);
    if (Object.entries(restaurant).length === 0) {
        return (<h1>LOADING</h1>)
    }

    let tags =  restaurant.tags.split(',').map(tag => {
                return <Chip label={tag.trim().toLowerCase()} variant="outlined" size="small" className={style.tag} />
    });
    
    let getCategories = () => {
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

    let categories = getCategories().map(c => {
        return <MenuCategory category={c}/>
    })

    
        return (
            <div>
                <h1>RestaurantBanner</h1>
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    <h3>{restaurant.name}</h3>
                    <h6>Rating</h6>
                    <Divider orientation="horizontal" flexItem className={ style.divider}/>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch" style={{marginBottom: "20px"}}>
                        <p className={style.address}>$$$$</p>
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
