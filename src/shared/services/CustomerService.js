import axiosInstance from '../../axiosInstance';

const selectCustomer = (data) => {
    return axiosInstance.post(`/crm-customer/selectCustomer/`, data);
}

const generateCiid = (data) => {
    return axiosInstance.post(`/crm-customer/cards/generate`, data);
}
const upsertCustomer = (data) => {
    return axiosInstance.post(`/crm-customer/upsertCustomer/`, data);
}

const CustomerService = {
    selectCustomer,
    generateCiid,
    upsertCustomer
};

export default CustomerService;