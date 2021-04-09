import Paper from '@material-ui/core/Paper';
import {useContext, useState, useEffect} from 'react';
import moment from 'moment';
import {find, clone, isEmpty, flatten, concat, each, pullAt, values, filter, isNil, orderBy} from 'lodash';


import DashboardStyles from './DashboardStyles';
import {GlobalContext} from '../../context/GlobalState';
import ConfigService from './../../shared/services/ConfigService';
import CustomerDataInfo from './../../components/customerDataInfo/CustomerDataInfo';
import HistoryPurchases from './../../components/historyPurchases/HistoryPurchases';
import SalesTransactions from './../../shared/services/SalesTransactions';


const permissions = (customerPermision) => {
    const permissionsKey = find(Object.keys(customerPermision), (key) => {
        return key.indexOf('CLUB') >= 0
    });
    const initialPermissions = clone(customerPermision[permissionsKey].permissionChannels);
    return initialPermissions.emailConsentFlag ? 'Yes' : 'No';
}

const Dashboard = ({configData}) => {
    const classes = DashboardStyles();
    const {customerData} = useContext(GlobalContext);
    const [customerInfo, setCustomerInfo] = useState('');
    const [salesOrderHistory, setSalesOrderHistory] = useState('')

    const showSalesOrderHistory = (ordersResponse) => {
        let orderHistory = flatten(ordersResponse[0]);
        let orderHistoryOnline = ordersResponse[1];

        let orderHistoryFom = [];
        if (ordersResponse.length > 2)
            orderHistoryFom = ordersResponse[2];

        const allOrders = concat(orderHistory, orderHistoryOnline, orderHistoryFom);
        // if (allOrders.length === 0) {
        //     $scope.customer.showOrdersSpinner = false;
        //     return;
        // }

        let filteredOrders = {};
        each(allOrders, function (myOrder, i) {
            if (myOrder.type === 'online') {
                if (!filteredOrders[myOrder.orderNumber]) {
                    filteredOrders[myOrder.orderNumber] = i;
                }
            } else if (myOrder.type === 'FOM') {
                filteredOrders[`${myOrder.orderNumber}_${myOrder.orderOutletId}}`] = i;
            } else {
                filteredOrders[`${myOrder.orderNumber}_${myOrder.orderOutletId}_${myOrder.date.getTime()}`] = i;
            }

            each(myOrder.orderDetails, function (details) {
                if (details.itemSet !== undefined) {
                    each(details.itemSet, function (item) {
                        myOrder.orderDetails.push(item);
                    });
                    myOrder.orderDetails.splice(i, 1);
                }
            });
        });

        const deduplicatedOrders = pullAt(allOrders, values(filteredOrders));
        const orders = filter(deduplicatedOrders, function (o) {
            return o.orderGrossTotal >= 0;
        });
        setSalesOrderHistory(orderBy(orders, ['date', 'orderNumber'], ['desc', 'desc']));
        //$scope.customer.showOrdersSpinner = false;
    };

    useEffect(() => {
        if (!isEmpty(customerData)) {
            const initializeTransactionsPanel = () => {
                let partyUUID = customerData.partyUid;
                let wcsUserId = customerData.wcsUserId || "";
                let orderHistorySettings = configData.orderHistorySettings;
                let getOrdersFromCar = true;
                let getOrdersFromFom = false;
                if (orderHistorySettings) {
                    getOrdersFromCar = orderHistorySettings.getOrdersFromCar;
                    getOrdersFromFom = orderHistorySettings.getOrdersFromFom;
                }
                let ciidPromises = [];

                if (customerData.cardCiid) {
                    customerData.cardCiid.forEach(ciid => {
                        ciidPromises.push(SalesTransactions.getSalesOrderHistoryAtStore(ciid));
                        ciidPromises.push(SalesTransactions.getSalesOrderHistoryOnlineByCiid(ciid));
                    });
                }

                if (!isNil(customerData.ccrCiid)) {
                    ciidPromises.push(SalesTransactions.getSalesOrderHistoryAtStore(customerData.ccrCiid));
                    ciidPromises.push(SalesTransactions.getSalesOrderHistoryOnlineByCiid(customerData.ccrCiid));
                }

                Promise.all([
                    // firing all in store orders calls
                    Promise.all(ciidPromises),
                    // firing the online orders from car call if enabled
                    getOrdersFromCar ? SalesTransactions.getSalesOrderHistory(partyUUID) : [],
                    // firing the online orders from fom call if enabled
                    getOrdersFromFom ? SalesTransactions.getSalesOrderHistoryFom(configData, wcsUserId) : []
                ]).then(result => {
                    showSalesOrderHistory(result);
                }).catch((error) => {
                    console.log(error);
                });
            };
            initializeTransactionsPanel();
        }
    }, [customerData, configData])

    useEffect(() => {
        if (!isEmpty(customerData)) {
            try {
                const getPreferredOutletName = async () => {
                    const preferredOutletName = await ConfigService.getStore(customerData.preferredOutlet);
                    const customer = {
                        ciid: customerData.cardCiid[0],
                        preferredOutlet: preferredOutletName.data.storeName,
                        consent: permissions(customerData.permissions),
                        activationDate: moment(customerData.clubDateOfEntry).format(configData.modules.DATE_FORMAT.toUpperCase()),
                        phoneNumber: customerData.mobile,
                        firstName: customerData.firstName,
                        lastName: customerData.lastName,
                        salutation: customerData.salutation
                    }
                    setCustomerInfo(customer)
                }
                getPreferredOutletName();
            } catch (error) {
                console.log(error);
            }
        }
    }, [customerData, configData]);
    
    return (
        <div className={classes.root}>
            {!isEmpty(customerData) ?
                <>
                    <CustomerDataInfo customer={customerInfo}/>
                    <HistoryPurchases salesOrderHistory={salesOrderHistory} configData={configData}/>
                    <Paper elevation={3}>
                        <h3 className={classes.paperHeader}>Coupons</h3>
                    </Paper>
                </> : null}
        </div>
    )
}

export default Dashboard;