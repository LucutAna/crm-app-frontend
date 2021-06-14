import {useContext, useState, useEffect} from 'react';
import moment from 'moment';
import {
    find,
    clone,
    isEmpty,
    flatten,
    concat,
    each,
    pullAt,
    values,
    filter,
    isNil,
    orderBy,
    chain,
    toInteger
} from 'lodash';


import DashboardStyles from './DashboardStyles';
import {GlobalContext} from '../../context/GlobalState';
import ConfigService from '../../shared/services/ConfigService';
import MemberService from '../../shared/services/MemberService';
import SalesTransactions from '../../shared/services/SalesTransactions';
import CustomerDataInfo from '../../components/customerDataInfo/CustomerDataInfo';
import HistoryPurchases from '../../components/historyPurchases/HistoryPurchases';
import Coupons from '../../components/Coupons/Coupons';


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
    const {addTransactions} = useContext(GlobalContext);
    const [customerInfo, setCustomerInfo] = useState({});
    const [salesOrderHistory, setSalesOrderHistory] = useState([]);
    const [customerCoupons, setCustomerCoupons] = useState([]);
    const [openSpinnerHistoryPurchase, setOpenSpinnerHistoryPurchase] = useState(false);
    const [openSpinnerCoupons, setOpenSpinnerCoupons] = useState(false);

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

    const initializeTransactionsPanel = async () => {
        setOpenSpinnerHistoryPurchase(true);
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

        const result = await Promise.all([
            // firing all in store orders calls
            Promise.all(ciidPromises),
            // firing the online orders from car call if enabled
            getOrdersFromCar ? SalesTransactions.getSalesOrderHistory(partyUUID) : [],
            // firing the online orders from fom call if enabled
            getOrdersFromFom ? SalesTransactions.getSalesOrderHistoryFom(configData, wcsUserId) : []
        ])
        showSalesOrderHistory(result);
    };

    // initialize panels
    useEffect(() => {
        if (!isEmpty(customerData)) {
            //customer info
            try {
                getPreferredOutletName();
            } catch (error) {
                console.log(error);
            }

            //order history
            initializeTransactionsPanel();

            // cupons
            setOpenSpinnerCoupons(true);
            const couponsPayload = {
                partyUid: customerData.partyUid,
                locale: configData.locales[0],
                salesDivision: configData.salesDivision,
                subsidiary: configData.subsidiary
            };
            getCouponsCustomer(couponsPayload);
        }
    }, [customerData, configData]);

    const showSalesOrderHistory = (ordersResponse) => {
        let orderHistory = flatten(ordersResponse[0]);
        let orderHistoryOnline = chain(ordersResponse[1])
            .groupBy('orderNumber')
            .map(gol => {
                return chain(gol)
                    .filter(ol => toInteger(ol.orderDetails[0].status) < 9999)
                    .orderBy("orderDetails[0].status", "desc")
                    .head()
                    .value();
            })
            .value();

        let orderHistoryFom = [];
        if (ordersResponse.length > 2)
            orderHistoryFom = ordersResponse[2];

        const allOrders = concat(orderHistory, orderHistoryOnline, orderHistoryFom);
        if (allOrders.length === 0) {
            setOpenSpinnerHistoryPurchase(false);
            return;
        }

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
        let orders = filter(deduplicatedOrders, function (order) {
            return order.orderGrossTotal >= 0;
        });

        const storesInfo = SalesTransactions.storesInfo;
        orders = orders.map(sale => {
            storesInfo.forEach(store => {
                if (sale.orderOutletId === store.storeNumber) {
                    sale.storeName = store.storeName;
                    sale.storeSapId = store.sapCode;
                }
            })
            return sale;
        });
        setSalesOrderHistory(orderBy(orders, ['date', 'orderNumber'], ['desc', 'desc']));
        addTransactions(orderBy(orders, ['date', 'orderNumber'], ['desc', 'desc']));
        setOpenSpinnerHistoryPurchase(false);
    };

    const getCouponsCustomer = async (data) => {
        try {
            const coupons = await MemberService.getCoupons(data);
            //TODO: check if the logic above is deprecated
            // map(coupons.data, (coupon) => {
            //     if (isNil(coupon.couponTypeName_de_DE))
            //         coupon.typeName = coupon.couponTypeName;
            //     else
            //         coupon.typeName = coupon.couponTypeName_de_DE;
            //     if (isNil(coupon.couponTypeDescription_de_DE))
            //         coupon.typeDescription = coupon.couponTypeDescription;
            //     else
            //         coupon.typeDescription = coupon.couponTypeDescription_de_DE;
            // });
            setCustomerCoupons(coupons.data);
            setOpenSpinnerCoupons(false);
        } catch (error) {
            console.log(error);
            setOpenSpinnerCoupons(false);
        }
    };

    const changeStatusCoupon = async (couponSelected) => {
        const data = {
            activationStatusCode: couponSelected.couponActivationCode === 'I' ? 'A' : 'I',
            couponCode: couponSelected.couponCode,
            partyUid: customerData.partyUid,
            salesDivision: configData.salesDivision,
            subsidiary: configData.subsidiary
        }
        try {
            const activateDeactivate = await MemberService.activateDeactivateCoupons(data);
            if (activateDeactivate.data.status === 'SUCCESS') {
                const couponsPayload = {
                    partyUid: customerData.partyUid,
                    locale: configData.locales[0],
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                };
                getCouponsCustomer(couponsPayload);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.root}>
            {!isEmpty(customerData) ?
                <>
                    <CustomerDataInfo customer={customerInfo}/>
                    <HistoryPurchases salesOrderHistory={salesOrderHistory} configData={configData}
                                      openSpinnerHistoryPurchase={openSpinnerHistoryPurchase}/>
                    <Coupons coupons={customerCoupons} onChangeStatusCoupon={changeStatusCoupon}
                             openSpinnerCoupons={openSpinnerCoupons}/>
                </> : null}
        </div>
    )
}

export default Dashboard;