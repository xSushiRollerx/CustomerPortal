import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';

import { useHistory } from "react-router-dom";
// import { Collapse } from 'bootstrap';

//https://material-ui.com/components/drawers/
const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));
export default function NavigationDrawer () {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    // const [openAccount, setOpenAccount] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleitemClick = (page) => {
        handleDrawerClose(); 
        history.push(page);
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                elevation={0}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                }), { background: "black" }}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                    >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    SushiBytes
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer    className={classes.drawer} variant="persistent"   anchor='left' open={open} classes={{ paper: classes.drawerPaper,}}>
                <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <Divider />
            <List>
                    <ListItem button onClick={() => { handleitemClick("/") } }>
                    <ListItemIcon>
                    <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button onClick={() => { handleitemClick("/restaurants") }}>
                    <ListItemIcon>
                    <SearchIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Search"}/>
                </ListItem>
                    <ListItem button onClick={() => { handleitemClick("/account/17/orders")   }}>
                    <ListItemIcon>
                    <RestaurantIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Orders"}/>
                </ListItem>
                    <ListItem button onClick={() => { handleitemClick("/account") }}>
                    <ListItemIcon>
                    <PersonOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Account"}/>
                    </ListItem>
                <ListItem button onClick={() => { handleitemClick("/basket") }}>
                    <ListItemIcon>
                            <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Basket"} />
                </ListItem>
                <ListItem>
                   {/* <Collapse in={openAccount}> */}
                   <List>
                      {localStorage.getItem('jwt')===null?<>
                      <ListItem button>
                        <Link to="/login">
                          <ListItemText>
                            Login
                          </ListItemText>
                        </Link>
                      </ListItem>
                      <ListItem button>
                        <Link to="/register">
                          <ListItemText>
                            Register
                          </ListItemText>
                        </Link>
                      </ListItem>
                      </>:<>
                        <ListItem button onClick={()=>{
                        localStorage.removeItem('jwt');
                        localStorage.removeItem('userId');
                        //this.history.push('login');
                        <Redirect to="/login" />
                        }}>
                          <ListItemText>
                            Logout
                          </ListItemText>
                        </ListItem>
                      </>}
                      </List>
                    {/* </Collapse> */}
                </ListItem>
            </List>
            </Drawer>
        </div>
    );
}