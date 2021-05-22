import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SearchFilter from './SearchFilter';
import RestaurantTable from './RestaurantTable';
import TablePagination from '@material-ui/core/TablePagination';
import RestaurantTablePagination from './RestaurantTablePagination';
import RestaurantService from './../../services/RestaurantService';
import { useState, useEffect } from 'react';


const useStyles = makeStyles((theme) => ({

    search: {
        borderRadius: 0,
        width: '100%'
    },
    sort: {
        height: 42,
        width: "100%"
    },
    sortDisplay: {
        width: "100%"
    },
    divider: {
        marginTop: 0,
        marginBottom: 10
    },
    filter: {
        borderRightStyle: "solid",
        borderRightWidth: 1,
        borderRightColor: "gray"
    },
    pagination: {
        border: 0,
        padding: 0
    },

}));
let response = {};

export default function RestaurantSearch(props) {
    const style = useStyles();
    const [sort, setSort] = useState('relevance');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState(0);
    const [state, setState] = React.useState({
        cheap: false,
        mid: false,
        fine: false,
    });
    const [priceCategories, setPriceCategories] = useState("1, 2, 3, 4");

    const { cheap, mid, fine, high } = state;

    const filter = (checkbox) => {
        let restaurants = [];
        let cheapHolder = cheap;
        let midHolder = mid;
        let fineHolder = fine;
        let highHolder = high;
        let query = "";

        if (checkbox === "cheap") {
            cheapHolder = !cheap;
        } else if (checkbox === "mid") {
            midHolder = !mid;
        } else if (checkbox === "fine") {
            fineHolder = !fine;
        } else if (checkbox === "high") {
            highHolder = !high;
        }

        if (cheapHolder) {
            query += ", 1"
        }

        if (midHolder) {
            query += ", 2"
        }

        if (fineHolder) {
            query += ", 3"
        }

        if (highHolder) {
            query += ", 4"
        }
        RestaurantService.getAllRestaurants(page, pageSize, query.substring(2)).then(res => response = res)
            .then(() => { console.log(response); setRows(response.data); setStatus(response.status) })
            .catch(err => { setStatus(500); });

        setPriceCategories(query.substring(2));
        console.log(checkbox + " toggled");
    }


    const handlePrices = (event) => {
        filter(event.target.name);
        setState({ ...state, [event.target.name]: event.target.checked });
    
    };

    const handleSort = (event) => {
        setSort(event.target.value);
    };
    const handleChangePage = (newPage) => {
        RestaurantService.getAllRestaurants(newPage, pageSize, priceCategories).then(res => response = res)
            .then(() => { console.log(response); setRows(response.data); setStatus(response.status) })
            .catch(err => { setStatus(500); });
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        RestaurantService.getAllRestaurants(0, event.target.value, priceCategories).then(res => response = res)
            .then(() => { setRows(response.data); setStatus(response.status) })
            .catch(err => { setStatus(500); });
        setPage(0);
        setPageSize(event.target.value);
    };

    useEffect(() => {
        console.log("get restaurants effect")
        RestaurantService.getAllRestaurants(0, 10, "1, 2, 3, 4").then(res => response = res)
            .then(() => { setRows(response.data); setStatus(response.status);})
            .catch(err => { setStatus(500); });
    }, []);

    if (status === 0) {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" className={style.loading} role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        );
    }
    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={10}>
                        <TextField className={style.search} placeholder="Search Restaurants" variant="outlined" InputLabelProps={{ shrink: false, }} size="small" color="black" xs={12} />
                    </Grid>
                    <Grid item xs={2} justify="flex-end">
                        <FormControl className={style.sortDisplay}>
                            <Select value={sort} onChange={handleSort} variant="outlined" size="small" className={style.sort} SelectDisplayProps={style.sortDisplay}>
                                <MenuItem value="relevance"> Relevance</MenuItem>
                                <MenuItem value="a-to-z">A-To-Z</MenuItem>
                                <MenuItem value="rating">Rating</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid direction="row" container xs={12} spacing={0} justify="center">
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={3}
                            count={rows.length > 0 ? rows[0].resultSize : 0}
                            rowsPerPage={pageSize}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={RestaurantTablePagination}
                            className={style.pagination}
                        />
                    </Grid>
                </Grid>
                <Divider orientation="horizontal" flexItem className={style.divider} />
                <Grid item xs={12} >
                    <Grid direction="row" container xs={12} spacing={0}>
                        <Grid className={style.filter} item xs={3}>
                            <SearchFilter mid={mid} cheap={cheap} fine={fine} high={high} handleChange={handlePrices}/>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container direction="column" alignItems="stretch" justify="flex-start">
                                <RestaurantTable rows={rows} page={page} rowsPerPage={rows.length}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
        );
}