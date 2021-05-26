import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import HistoryIcon from '@material-ui/icons/History';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { Collapse } from 'bootstrap';

//https://material-ui.com/components/drawers/
const drawerWidth = 240;
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
    // const [openAccount, setOpenAccount] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
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
                    Customer Portal App
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer 
            className={classes.drawer}
            variant="persistent"
            anchor='left'
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <Divider />
            <List>
                <ListItem button>
                    <Link to="/">
                    <ListItemIcon>
                    <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"}/>
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/orders">
                    <ListItemIcon>
                    <RestaurantIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Current Orders"}/>
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/past_orders">
                    <ListItemIcon>
                    <HistoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Past Orders"}/>
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/loyalty_points">
                    <ListItemIcon>
                    <LoyaltyIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"loyalty points"}/>
                    </Link>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <PersonOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Account"}/>
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
                        <ListItem button>
                        <Link to="/profile">
                          <ListItemText>
                            Profile
                          </ListItemText>
                        </Link>
                        </ListItem>
                        <ListItem button onClick={()=>{
                        localStorage.removeItem('jwt');
                        localStorage.removeItem('userId');
                        this.props.history.push('login');
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