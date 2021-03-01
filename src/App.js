import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";
import './App.css';

import Home from './containers/home/Home.js'
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './containers/dashboard/Dashboard';
import OrderHistory from "./containers/order-history/OrderHistory";
import Coupons from "./containers/coupons/Coupons";

function App() {
    const [configData, setConfigData] = useState([]);
    const [outletID, setOutletID] = useState('');


    useEffect(() => {
        const getStoreConfig = async () => {
            const storeConfig = await getStore(getOutletId());
            const dataConfig = await getConfigData(storeConfig);
            setConfigData(dataConfig);
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
            <div className="container">
                <Sidebar onConfiguration={configData}/>
                <Route path={['/', '/crm', `/crm/?outletId=${outletID}`]} exact component={Home}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/order-history' component={OrderHistory}/>
                <Route path='/coupons' component={Coupons}/>
            </div>
        </Router>
    );
}

export default App;
