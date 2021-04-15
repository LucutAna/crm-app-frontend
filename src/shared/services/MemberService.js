import axiosInstance from '../../axiosInstance';

const getCoupons = (data) => {
    return axiosInstance.post(`crm-members/coupons/`, data);
};

const activateDeactivateCoupons = (data) => {
    return axiosInstance.post(`/crm-members/activateDeactivateCoupons/`, data);
};
const MemberService = {
    getCoupons,
    activateDeactivateCoupons
};

export default MemberService;