import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RestaurantResult from './RestaurantResult';



export default function RestaurantTable(props) {

    const emptyRows = props.rowsPerPage - Math.min(props.rowsPerPage, props.rows.length - props.page * props.rowsPerPage);



    return (
            <Table aria-label="custom pagination table">
                <TableBody>
                    {(props.rowsPerPage > 0
                        ? props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                        : props.rows
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <RestaurantResult restaurant={row}/>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
    );
}