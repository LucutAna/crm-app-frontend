import clsx from "clsx";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/styles';


import AppStyles from './AppStyles';
import ThemeCRMApp from './ThemeCRMApp';
import Home from "./containers/home/Home";
import Dashboard from "./containers/dashboard/Dashboard";
import OrderHistory from "./containers/order-history/OrderHistory";
import CouponsPage from "./containers/coupons/CouponsPage";
import SuccessPage from "./containers/successPage/SuccessPage";
import ConfigService from './shared/services/ConfigService'
import {GlobalProvider} from './context/GlobalState';
import Header from "./components/header/Header";
import SideBarNav from "./components/sideBarNav/SideBarNav";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";

function App() {
    const drawerWidth = 240;
    const classes = AppStyles();
    const [open, setOpen] = useState(false);
    const [configData, setConfigData] = useState([]);
    const [outletID, setOutletID] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState({open: false, message: '', code: ''});
    

    useEffect(() => {
        try {
            const getStoreConfig = async () => {
                const storeConfig = await ConfigService.getStore(getOutletId());
                const dataConfig = await ConfigService.getConfigData({...storeConfig.data});
                setConfigData({...dataConfig.data, ...storeConfig.data});
            };
            getStoreConfig();
        } catch (error) {
            console.log(error);
        }
    }, []);

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

    //handle for sidebar navigation
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={ThemeCRMApp}>
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
                                   component={() => <Home configData={configData}
                                                          onSetOpenSnackbar={setOpenSnackbar}/>}/>
                            <Route path='/dashboard' component={() => <Dashboard configData={configData}/>}/>
                            <Route path='/order-history' component={() => <OrderHistory configData={configData}/>}/>
                            <Route path='/coupons' component={() => <CouponsPage configData={configData}/>}/>
                            <Route path='/success' component={(customer) => <SuccessPage {...customer}/>}/>
                        </main>
                        <SnackbarComponent openSnackbar={openSnackbar}/>
                    </div>
                </Router>
            </GlobalProvider>
        </ThemeProvider>
    );
}

export default App;
