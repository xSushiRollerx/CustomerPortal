import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import RestaurantResult from './RestaurantResult';
import Grid from '@material-ui/core/Grid';


export default function RestaurantTable(props) {
    return (
            <Table aria-label="custom pagination table">
                <TableBody>
                {props.rows.length !== 0 ? props.rows.map((r, i) => {
                        return (
                            <TableRow key={r.id}>
                                <RestaurantResult restaurant={r} />
                            </TableRow>
                        )
                }) : <Grid container item alignItems="center" justify="center"> <h5>No Restaurants Match Your Search. Please Try Again.</h5></Grid>}
                </TableBody>
            </Table>
    );
}