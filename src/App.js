import './App.css';
import {GlobalProvider} from './context/GlobalState';
import Header from "./components/header/Header";
import SideBarNav from "./components/sideBarNav/SideBarNav";
import clsx from "clsx";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./containers/home/Home";
import Dashboard from "./containers/dashboard/Dashboard";
import OrderHistory from "./containers/order-history/OrderHistory";
import Coupons from "./containers/coupons/Coupons";
import {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ConfigService from './shared/services/ConfigService'


function App() {
    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
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

    const [open, setOpen] = useState(false);
    const [configData, setConfigData] = useState([]);
    const [outletID, setOutletID] = useState('');

    useEffect(() => {
        const getStoreConfig = async () => {
            const storeConfig = await ConfigService.getStore(getOutletId());
            const dataConfig = await ConfigService.getConfigData(storeConfig);
            setConfigData({...dataConfig, ...storeConfig});
        };
        getStoreConfig();

    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };



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
        <GlobalProvider>
            <Router>
                <div className={classes.root}>
                    <Header drawerWidth={drawerWidth}
                            open={open}
                            configData={configData}
                            onHandleDrawerOpen={handleDrawerOpen}/>
                    <SideBarNav drawerWidth={drawerWidth}
                                open={open}
                                onHandleDrawerClose={handleDrawerClose}/>
                    <main className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                    >
                        <div className={classes.drawerHeader}/>
                        <Route path={['/', '/crm', `/crm/?outletId=${outletID}`]} exact
                               component={() => <Home configData={configData}/>}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route path='/order-history' component={OrderHistory}/>
                        <Route path='/coupons' component={Coupons}/>
                    </main>
                </div>
            </Router>
        </GlobalProvider>
    );
}

export default App;
