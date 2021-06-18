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


const useStyles = makeStyles({
    tags: {
        marginTop: 8,
        marginBottom: 8
    },
    tag: {
        marginRight: 8,
        fontSize: 12
    },
    addressBlock: {
        marginTop: 0,
        marginBottom: 0
    },
    address: {
        marginBottom: 0,
        fontSize: 12
    },
    divider: {
        marginBottom: 10
    },

    pricing: {
        fontSize: 17,
        paddingBottom: 2,
    },
    loading: {
        width: "3rem",
        height: "3rem"
    },
    fab: {
        marginLeft: "90%"
    }
});
let response = {};
export default function RestaurantProfile() {

    const style = useStyles();
    const { id } = useParams();
    let [restaurant, setRestaurant] = useState({});
    const [status, setStatus] = useState(0);

    const getResponse = () => {
        // RestaurantService.getRestaurant(id).then(response => { setRestaurant(response.data);});
        //not setting response when it's a 500 error
        RestaurantService.getRestaurant(id).then(res => { response = res })
            //why isn't it waiting until response has returned
            .then(() => { setRestaurant(response.data); setStatus(response.status); })
            .catch(err => { console.log("error"); setStatus(500); });
    }
    useEffect(() => {
        getResponse();
    }, []);

    

    //wait for object to be loaded and promise fulfilled   
    if (status === 0) {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" className={style.loading} role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        );
    } 

    console.log(response);
    if (status !== 200) {
        return <h1>{"Something Went Wrong. " + status + " Error"}</h1>
        //return <Redirect to='/login' />;
 
    }

   
    

    const tags =  restaurant.tags.split(',').map(tag => {
                return <Chip label={tag.trim().toLowerCase()} variant="outlined" size="small" className={style.tag} />
    });
    
    const getCategories = () => {
        let menu = restaurant.menu.sort((a, b) => a.category - b.category);
        let result = [];
        
        for (let i = 0; i < menu.length; i++) {
            if ((menu[i].isActive !== 1)) { 
            } else if (result.length === 0 || result[result.length - 1][0].category !== menu[i].category) {
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
        return icons.map((m, i) => <MonetizationOnIcon data-testid={"MonetizaitionIcon " + i} className={style.pricing}/>);
    };
    
        return (
            <div data-testid="RestaurantProfile">
                <h1>RestaurantBanner</h1>
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    <h3>{restaurant.name}</h3>
                    <Divider orientation="horizontal" flexItem className={style.divider} />
                    <Grid container item direction="row" justify="flex-start" alignItems="center" spacing={1}>
                        <Grid item>{pricing()} </Grid>
                        <Grid item>
                            <h6 className={style.address}>{restaurant.streetAddress}, {restaurant.city}, {restaurant.state} {restaurant.zipCode}</h6>
                        </Grid>

                    </Grid>
                    <Grid container item direction="row" justify="flex-start" alignItems="center" className={style.tags}>
                        {tags}
                    </Grid>
                    <Divider orientation="horizontal" flexItem className={style.divider}/>
                    <Grid container direction="column" justify="flex-start">
                        {categories}
                    </Grid>
                </Grid>
            </div>);
}
