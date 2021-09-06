import axiosInstance from '../../axiosInstance';

const getCoupons = (data) => {
    return axiosInstance.post(`crm-members/coupons/`, data);
};
const getHousehold = (data) => {
    return axiosInstance.post(`crm-members/household/`, data);
};
const activateDeactivateCoupons = (data) => {
    return axiosInstance.post(`/crm-members/activateDeactivateCoupons/`, data);
};

const getTransactions =(data) =>{
    return axiosInstance.post(`/crm-members/memberTransactions/`, data);
}
const MemberService = {
    getCoupons,
    activateDeactivateCoupons,
    getHousehold,
    getTransactions
};

export default MemberService;
