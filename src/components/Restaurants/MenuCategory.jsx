import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from './FoodItem';
import Divider from '@material-ui/core/Divider';


class MenuCategory extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <Grid container direction="column" justify="flex-start" alignItems="stretch" >
                <h3>Category Name</h3>
                <Grid container direction="row" justify="flex-start" alignItems="stretch">
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                </Grid>
                <Divider orientation="horizontal" flexItem />
            </Grid>);

    }
}

export default MenuCategory;