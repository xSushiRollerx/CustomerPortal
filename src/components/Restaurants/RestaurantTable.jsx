import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import RestaurantResult from './RestaurantResult';


export default function RestaurantTable(props) {
    return (
            <Table aria-label="custom pagination table">
                <TableBody>
                {props.rows.map((r, i) => {
                        return (
                            <TableRow key={r.id}>
                                <RestaurantResult restaurant={r} />
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
    );
}