import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';


class MenuItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
           
            <Grid container item justify="row" alignItems="center" xs={6}>
                    <Grid container item justify="center" alignItems="stretch" xs={6}>Image</Grid>
                    <Grid container item justify="flex-start" alignItems="stretch" xs={6}>
                    <h6>Food Name</h6>
                    <p>asdkla asldksdl asas asddkjkasd lkksd asdlk asd asdjkdn asdnkssd djkansd</p>
                    <p>$XX.XX</p>
                    </Grid> 
             </Grid>
            
                  );

    }
}

export default MenuItem;