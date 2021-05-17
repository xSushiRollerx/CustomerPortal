import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import MenuCategory from './MenuCategory';


class RestaurantProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {

        return (
            <div>
                <h1>RestaurantBanner</h1>
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    <h3>Restaurant Name</h3>
                    <h6>Rating</h6>
                    <Divider orientation="horizontal" flexItem style={{ marginBottom: "20px" }}/>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch" style={{marginBottom: "20px"}}>
                        <p style={{ margin: "0px" }}>$$$$</p>
                        <p style={{ margin: "0px" }}>Street</p>
                        <p style={{ margin: "0px" }}>City, State</p>
                        <p style={{ margin: "0px" }}>Zip Code</p>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{ marginBottom: "20px" }}>
                        <Chip label="tags" variant="outlined" size="small" />
                        <Chip label="burger" variant="outlined" size="small" />
                        <Chip label="american" variant="outlined" size="small" />
                        <Chip label="comfort" variant="outlined" size="small" />
                        <Chip label="southern" variant="outlined" size="small" />

                    </Grid>
                    <Divider orientation="horizontal" flexItem />
                    <Grid container direction="column" justify="flex-start">
                        <MenuCategory />
                        <MenuCategory />
                    </Grid>
                </Grid>
            </div>);

    }
}

export default RestaurantProfile;