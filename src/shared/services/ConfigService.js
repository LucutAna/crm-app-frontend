import axiosInstance from '../../axiosInstance';

const getStore = (outletId) => {
    return axiosInstance.get(`/crm-util/stores/${outletId}/`);
};

const getConfigData =  ({salesDivision, subsidiary}) => {
    return axiosInstance.get(`/crm-util/configurations/`, {
        headers: {
            salesDivision,
            subsidiary
        }
    });
}

const ConfigService = {
    getStore,
    getConfigData
};

export default ConfigService;