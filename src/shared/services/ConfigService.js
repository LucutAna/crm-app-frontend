import axiosInstance from '../../axiosInstance';

const getStore = (outletId) => {
    return axiosInstance.get(`/crm-util/stores/${outletId}/`);
};

const getConfigData = ({data}) => {
    return axiosInstance.get(`/crm-util/configurations/`, {
        headers: {
            salesDivision: data.salesDivision,
            subsidiary: data.subsidiary
        }
    });
}

const ConfigService = {
    getStore,
    getConfigData
};

export default ConfigService;