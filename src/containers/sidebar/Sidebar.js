import {NavLink} from 'react-router-dom'
import React, {useEffect, useState, useContext} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import axios from "axios";

import './Sidebar.css';
import {GlobalContext} from '../../context/GlobalState';
import Home from "../home/Home";
import Dashboard from "../dashboard/Dashboard";
import OrderHistory from "../order-history/OrderHistory";
import Coupons from "../coupons/Coupons";


const Sidebar = () => {
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
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // set Global State
    const [configData, setConfigData] = useState([]);
    const [outletID, setOutletID] = useState('');
    const {addConfig} = useContext(GlobalContext);

    useEffect(() => {
        const getStoreConfig = async () => {
            const storeConfig = await getStore(getOutletId());
            const dataConfig = await getConfigData(storeConfig);
            setConfigData({...dataConfig, ...storeConfig});
            addConfig({...dataConfig, ...storeConfig});
        };
        getStoreConfig();

    }, []);


    const getStore = async (outletId) => {
        const response = await axios.get(`/crm-util/stores/${outletId}/`);
        return await response.data;
    };

    const getConfigData = async ({salesDivision, subsidiary}) => {
        const response = await axios.get(`/crm-util/configurations/`, {
            headers: {
                salesDivision,
                subsidiary
            }
        });
        return await response.data;
    }

    const getOutletId = () => {
        let outletId = window.location.href.split('=')[1];
        if (outletId === undefined)
            outletId = localStorage.getItem('outletId');
        if (!outletId)
            outletId = 434;
        else localStorage.setItem('outletId', outletId);
        setOutletID(outletId);
        return outletId;
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
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
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Club-Browser {configData.storeName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <MenuList>
                        <MenuItem>
                            <NavLink to='/crm'>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">Home</Typography>
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to='/dashboard'>
                                <ListItemIcon>
                                    <DashboardIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">Dashboard</Typography>
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to='/order-history'>
                                <ListItemIcon>
                                    <ReceiptIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">Order History</Typography>
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to='/coupons'>
                                <ListItemIcon>
                                    <CreditCardIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">Coupons</Typography>
                            </NavLink>
                        </MenuItem>
                    </MenuList>
                    <Divider/>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <Route path={['/', '/crm', `/crm/?outletId=${outletID}`]} exact component={Home}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path='/order-history' component={OrderHistory}/>
                    <Route path='/coupons' component={Coupons}/>
                </main>
            </div>
        </Router>
    );
}

export default Sidebar;