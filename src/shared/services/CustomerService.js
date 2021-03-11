import axiosInstance from '../../axiosInstance';

const selectCustomer = (data) => {
    return axiosInstance.post(`/crm-customer/selectCustomer/`, data);
}

const CustomerService = {
    selectCustomer
};

export default CustomerService;