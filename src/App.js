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
import ClubAccountPage from "./containers/club-account/ClubAccountPage"
// import ShoppingCard from "./components/shoppingCard/ShoppingCardFirstTry";
import ShoppingCard from "./components/shoppingCardFeature/ShoppingCard";
import ConfigService from './shared/services/ConfigService'
import {GlobalProvider} from './context/GlobalState';
import Header from "./components/header/Header";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";
import SideBarNav from "./components/sideBarNav/SideBarNav";
import MultiStepForm from "./components/formikCard/formik";
import ChannelPermissionsPage from "./containers/channel-permissions/ChannelPermissionsPage";
import TransactionsBits from "./components/transactionsBits/TransactionsBits";
import {useTranslation, Trans} from 'react-i18next';
import './i18n/i18n';
import i18n from 'i18next';
import {loadResources} from "./i18n/i18n";
import CustomerDataStep from "./components/shoppingCardFeature/CustomerDataStep";

function App() {
    const drawerWidth = 240;
    const classes = AppStyles();
    const [open, setOpen] = useState(false);
    const [configData, setConfigData] = useState([]);
    const [outletID, setOutletID] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState({open: false, message: '', code: ''});
    const {t} = useTranslation();

     useEffect(() => {
    try {
        const getStoreConfig = async () => {
            const storeConfig = await ConfigService.getStore(getOutletId());
            const dataConfig = await ConfigService.getConfigData({...storeConfig.data});

            console.log('dataConfig.data.locales[0]', dataConfig.data.locales[0])
            console.log('storeconfig', storeConfig)

            loadResources(dataConfig.data.locales[0]).then(async (response) => {
                i18n.addResourceBundle('pl', 'translations', response, true, true);
                await i18n.changeLanguage('pl').then(() => {
                    loadResources(dataConfig.data.locales[0]).then(async (response) => {
                        console.log('response', response)
                        i18n.addResourceBundle(dataConfig.data.locales[0], 'translations', response, true, true);
                    });
                });
            });
            setConfigData({...dataConfig.data, ...storeConfig.data});
        };
        getStoreConfig();
    } catch (error) {
        console.log(error);
    }

     }, []);

    console.log('configData', configData)

    // useEffect(() => {
    //     // console.log("change Language", i18n)
    //     if(Object.keys(configData).length) {
    //         loadResources(configData.locales[0]).then(async (response) => {
    //             i18n.addResourceBundle('pl', 'translations', response, true, true);
    //             i18n.changeLanguage('pl')
    //             await i18n.changeLanguage('pl').then(() => {
    //                 loadResources(configData.data.locales[0]).then(async (response) => {
    //                     console.log('response', response)
    //                     i18n.addResourceBundle(configData.data.locales[0], 'translations', response, true, true);
    //                 });
    //             });
    //         });
    //     }
    // }, []);

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
                                <Route path='/club-account'
                                       component={() => <ClubAccountPage configData={configData}/>}/>
                                <Route path='/channel-permissions'
                                       component={() => <ChannelPermissionsPage configData={configData}/>}/>
                                <Route path='/shopping-card' component={() => <CustomerDataStep configData={configData}/>}/>
                                <Route path='/formik' component={() => <MultiStepForm configData={configData}/>}/>
                                <Route path='/success' component={(customer) => <SuccessPage {...customer}/>}/>
                                <Route path='/transactions-bits'
                                       component={() => <TransactionsBits configData={configData}/>}/>
                            </main>
                            <SnackbarComponent openSnackbar={openSnackbar}/>
                        </div>
                    </Router>
                </GlobalProvider>
            </ThemeProvider>
        );
    }

export default App;
