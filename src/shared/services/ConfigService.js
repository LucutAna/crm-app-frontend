import axiosInstance from '../../axiosInstance';

const getStore = outletId => {
    return axiosInstance.get(`/crm-util/stores/433/`);
};

const getStoreBySapId = sapOutletId => {
    return axiosInstance.get(`crm-util/outlet?sapCode=${sapOutletId.toUpperCase()}`)
}

const getConfigData = ({salesDivision, subsidiary}) => {
    return axiosInstance.get(`/crm-util/configurations/`, {
        headers: {
            salesDivision,
            subsidiary
        }
    });
}

const updateSalesSlip = (data) => {
   return axiosInstance.post(`/crm-sales/updateSalesSlip/`, data)
}

const ConfigService = {
    getStore,
    getStoreBySapId,
    getConfigData,
    updateSalesSlip
};

export default ConfigService;
