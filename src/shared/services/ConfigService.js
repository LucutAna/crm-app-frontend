import axiosInstance from '../../axiosInstance';

const getStore = outletId => {
    return axiosInstance.get(`/crm-util/stores/${outletId}/`);
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
const getLanguage = locale => {
    return axiosInstance.get(`/crm-util/${locale}/translations/`);
};

const updateSalesSlip = (data) => {
   return axiosInstance.post(`/crm-members/updateSalesSlip/`, data)
}

const ConfigService = {
    getStore,
    getStoreBySapId,
    getConfigData,
    updateSalesSlip,
    getLanguage
};

export default ConfigService;
