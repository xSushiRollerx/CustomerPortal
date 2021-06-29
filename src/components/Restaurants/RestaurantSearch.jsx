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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }

}));
let response = {};
export default function RestaurantSearch(props) {
    const style = useStyles();
    const [sort, setSort] = useState('default');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState(0);
    const [keywords, setKeywords] = useState("");
    const [address, updateAddress] = useState({});
    const [state, setState] = useState({
        cheap: false,
        mid: false,
        fine: false,
    });
    const [ratings, setRatings] = useState(0);
    
    //for other parts of app to use so they don't have to convert booleans string. prob should have been function;
    const [priceCategories, setPriceCategories] = useState("1, 2, 3, 4");

    const { cheap, mid, fine, high } = state;
    const filter = async (checkbox) => {
        console.log(checkbox)
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

        if (query === "") {
            query = ", 1, 2, 3, 4"
        }

        try {
            let res = await RestaurantService.getAllRestaurants(0, pageSize, query.substring(2), ratings, sort, keywords).then(res => response = res);
            setStatus(res.status);
            console.log(res);
            setRows(res.data);
        } catch (error) {
            setStatus(500);

        }

        setPage(0);
        setPriceCategories(query.substring(2));
    }
    const handlePrices = (event) => {
        filter(event.target.name);
        setState({ ...state, [event.target.name]: event.target.checked });
    
    };
    const clearPrices = async () => {
        try {
            let res = await RestaurantService.getAllRestaurants(0, pageSize, "1, 2, 3, 4", ratings, sort, keywords).then(res => response = res)
            setStatus(res.status);
            console.log(res);
            setRows(res.data);
        } catch (error) {
            setStatus(500);
        }

        setPage(0);
        setPriceCategories("1, 2, 3, 4");
        setState({
            cheap: false,
            mid: false,
            fine: false,
        });
    }
    const handleRatingsChange = async (event) => {
        console.log(event.target.value);
        try {
            let res = await RestaurantService.getAllRestaurants(0, pageSize, priceCategories, event.target.value, sort, keywords).then(res => response = res);
            setStatus(res.status);
            console.log(res);
            setRows(res.data);
        } catch (error) {
            setStatus(500);
        }
        setRatings(event.target.value);
    }
    const handleSort = async (event) => {
        console.log("Handle Sort: " + event.target.value);
        try {
            let res = await RestaurantService.getAllRestaurants(0, pageSize, priceCategories, ratings, event.target.value, keywords).then(res => response = res);
            setRows(res.data);
            setStatus(res.status);
        } catch (error) {
            setStatus(500);
        }
        setPage(0);
        setSort(event.target.value);
    };
    const handleChangePage = async (newPage) => {
        try {
            let res = await RestaurantService.getAllRestaurants(newPage, pageSize, priceCategories, ratings, sort, keywords).then(res => response = res);
            setStatus(res.status);
            console.log(res);
            setRows(res.data);
        } catch (error) {
            setStatus(500);
        }
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        RestaurantService.getAllRestaurants(0, event.target.value, priceCategories, ratings, sort, keywords).then(res => response = res)
            .then(() => { setRows(response.data); setStatus(response.status) })
            .catch(err => { setStatus(500); });
        setPage(0);
        setPageSize(event.target.value);
    };
    const handleAddressChange = () => {
        console.log("handle address change run");
        console.log(document.getElementById('dropOffSelect').value);
        if (document.getElementById('dropOffSelect').value.trim() !== "") {
            let temp = document.getElementById('dropOffSelect').value.trim().split(",");
            updateAddress({ streetAddress: temp[0], city: temp[1], state: temp[2], zipCode: null })
            localStorage.setItem('dropOffAddress', JSON.stringify({ streetAddress: temp[0], city: temp[1], state: temp[2], zipCode: null}));
        }
    }
    useEffect(async () => {
        try {
            let res = await RestaurantService.getAllRestaurants(0, 10, "1, 2, 3, 4", 0, "default", "");
            setStatus(res.status);
            setRows(res.data);
        } catch (error) {
            setStatus(500);
        }
        
        
        //load event listener for when user hits enter
        window.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                console.log(document.getElementById("searchBar").value);
                try {
                    let res = RestaurantService.getAllRestaurants(0, pageSize, "1, 2, 3, 4", 0, "relevance", (document.getElementById("searchBar") !== null ? document.getElementById("searchBar").value : ""))
                    setStatus(res.status);
                    console.log(res);
                    setRows(res.data);
                } catch (error) {
                    setStatus(500);
                }
                setKeywords(document.getElementById("searchBar").value);
                setPage(0);
                setSort("relevance");
                setState({
                    cheap: false,
                    mid: false,
                    fine: false,
                });
                document.getElementById("clearRatings").click();
            }
        })
    }, [])

    if (status === 0) {
        return (

           <div data-testid="Waiting">
                <Backdrop className={style.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
         </div>
        );
    }
    console.log(rows);
    return (
        <Grid container direction="column" inputProps={{ 'data-testid': 'SearchPage' }}>
            <Grid item xs={12}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={10}>
                        < TextField className={style.search} placeholder="Search Restaurants" variant="outlined" inputProps={{ 'data-testid': 'searchBar' }}
                            InputLabelProps={{ shrink: false, }} size="small" color="black" xs={12} id="searchBar" defaultValue={keywords}/>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={style.sortDisplay}>
                            <Select value={sort} onChange={handleSort} inputProps={{'data-testid': "sortSelect"}} variant="outlined" size="small" className={style.sort} SelectDisplayProps={style.sortDisplay}>
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem hidden={keywords === "" ? true : false} value="relevance"> Relevance</MenuItem>
                                <MenuItem value="a-to-z">A-To-Z</MenuItem>
                                <MenuItem value="ratings">Ratings</MenuItem>
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
                            <SearchFilter mid={mid} cheap={cheap} fine={fine} high={high} ratings={ratings} handleChange={handlePrices}
                                handleRatings={handleRatingsChange} clearPrices={clearPrices} address={address} addressChange={handleAddressChange}/>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container direction="column" alignItems="stretch" justify="flex-start">
                                {status === 200 ? <RestaurantTable rows={rows} page={page} rowsPerPage={rows.length} /> :
                                   <Grid container item alignItems="center" justify="center"> <h5>Something Went Wrong. Please Try Again.</h5></Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
        );
}