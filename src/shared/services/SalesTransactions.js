import axiosInstance from '../../axiosInstance';
import ConfigService from './ConfigService';
import {isEmpty} from 'lodash';

const storeConfigData = {};
const storesInfo = [];

const getStoreDetails = async (sale) => {
    const storeDetails = await ConfigService.getStore(sale.orderOutletId);
    const store = {
        storeNumber: storeDetails.data.storeNumber.toString(),
        storeName: storeDetails.data.storeName,
        sapCode: storeDetails.data.sapCode
    };
    storesInfo.push(store);
};

const getSalesOrderHistoryAtStore = async (loyaltyNumber) => {
    const result = await axiosInstance.get(`/crm-sales/orderHistory/${loyaltyNumber}`);
    if (!result || result.status !== 200)
        return [];
    result.data
        .map(sale => {
            sale.date = new Date(sale.orderTime);
            sale.type = 'store';
            sale.isNavCollapsed = false;
            sale.loyaltyNumber = loyaltyNumber;
            if (!storeConfigData.hasOwnProperty(sale.orderOutletId))
                storeConfigData[sale.orderOutletId] = getStoreDetails(sale);
            return sale;
        });
    return result.data;
};

const getSalesOrderHistoryOnlineByCiid = async (loyaltyNumber) => {
    const result = await axiosInstance.get(`/crm-sales/salesOrder/orderHistoryOnline/${loyaltyNumber}`);
    if (!result || result.status !== 200)
        return [];
    result.data
        .map(sale => {
            sale.date = new Date(sale.orderTime);
            sale.type = 'online';
            sale.isNavCollapsed = false;
            sale.loyaltyNumber = loyaltyNumber;
            if (!storeConfigData.hasOwnProperty(sale.orderOutletId))
                storeConfigData[sale.orderOutletId] = getStoreDetails(sale);
            return sale;
        });
    return result.data;
}

const getSalesOrderHistory = async (partyUUID) => {
    const result = await axiosInstance.get(`/crm-sales/orderHistoryOnline/${partyUUID}`);
    if (!result || result.status !== 200)
        return [];
    result.data
        .map(sale => {
            sale.date = new Date(sale.orderTime);
            sale.type = 'online';
            sale.isNavCollapsed = false;
            if (!storeConfigData.hasOwnProperty(sale.orderOutletId))
                storeConfigData[sale.orderOutletId] = getStoreDetails(sale);
            return sale;
        });
    return result.data;
};

const getSalesOrderHistoryFom = async ({configData, wcsUserId}) => {
    //TODO check if it work
    if (!isEmpty(wcsUserId)) {
        let deferred = new Promise();
        deferred.resolve([]);
        return deferred.promise;
    }
    try {
        const result = await axiosInstance.get(`/crm-sales/orderHistoryFom/${wcsUserId}`, {
            headers: {
                "salesDivision": configData.salesDivision,
                "subsidiary": configData.subsidiary
            }
        });
        result.data
            .map(sale => {
                if (sale.orderTime)
                    sale.date = new Date(sale.orderTime);

                sale.type = 'FOM';
                sale.isNavCollapsed = false;
                // map webshops for FOM
                if (!isEmpty(sale.outletId)) {
                    sale.storeName = "MEDIA MARKT ONLINE SHOP";
                    let orderHistorySettings = configData.orderHistorySettings;
                    if (orderHistorySettings) {
                        sale.storeSapId = orderHistorySettings.fomSettings.onlineStoreSapId;
                    } else {
                        sale.storeSapId = "";
                    }
                    return sale;
                }
                const getStoreDetails = async () => {
                    const storeConfig = await ConfigService.getStore(sale.orderOutletId);
                    sale.storeName = storeConfig.data.storeName;
                    sale.storeSapId = storeConfig.data.sapCode;
                };
                getStoreDetails();
                return sale;
            });
        return result.data;
    } catch (error) {
        return []
    }
};

const updateSalesSlip = data => {
    return axiosInstance.post(`/crm-members/updateSalesSlip/`, data);
}
const SalesTransactions = {
    getSalesOrderHistoryAtStore,
    getSalesOrderHistoryOnlineByCiid,
    getSalesOrderHistory,
    getSalesOrderHistoryFom,
    updateSalesSlip,
    storesInfo,
};

export default SalesTransactions;
