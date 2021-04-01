import axiosInstance from '../../axiosInstance';
import moment from 'moment';

const selectCustomer = (data) => {
    return axiosInstance.post(`/crm-customer/selectCustomer/`, data);
}

const generateCiid = (data) => {
    return axiosInstance.post(`/crm-customer/cards/generate`, data);
}
const upsertCustomer = (data) => {
    return axiosInstance.post(`/crm-customer/upsertCustomer/`, data);
}

const validateCardNumber = (data) => {
    return axiosInstance.post(`/crm-customer/cards/validate`, data)
}

const isClubCardNumberFormatValid = (clubCardNumber, salesDivision, subsidiary) => {
    const keys = ['AT', 'BE', 'DE', 'GR', 'HU', 'LU', 'PL', 'SE', 'TR', 'CH', 'NL', 'ES'];
    const values = ['43', '32', '49', '30', '36', '36', '48', '46', '90', '41', '31', '34'];
    let countryCode = clubCardNumber.substr(5, 2);
    let checksum = parseInt(clubCardNumber.substr(clubCardNumber.length - 1), 10);
    let ccIndex = values.indexOf(countryCode);
    let odd = 0;
    let even = 0;
    salesDivision = clubCardNumber.substr(4, 1);

    if (!/9802[1-2]{1}\d{11}/g.test(clubCardNumber)
        || ccIndex === -1
        || keys[ccIndex] !== subsidiary) {

        return false;
    }

    for (let i = 0; i < (clubCardNumber.length - 1); i++) {
        let intValue = parseInt(clubCardNumber.charAt(i), 10);
        //sum up the digits that are on EVEN and ODD positions separately
        if (i % 2 === 0) {
            even += intValue;
        } else {
            odd += intValue;
        }
    }

    return 9 - ((even * 3 + odd) % 10) === checksum;
}

const createCustomerPrintData = (form, configData) => {
    const customerEnrollData = {
        cardCiid: !!form.cardCiid ? form.cardCiid[0] : '',
        subsidiary: configData.subsidiary,
        crefid: null,
        birthDate: form.birthDate,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        memberCardFlag: true,
        clubMemberActiveFlag: true,
        customerConsentFlag: form.updateCustomerFlag,
        outletId: configData.storeNumber,
        preferredOutlet: form.preferredOutlet || configData.storeNumber,
        salesDivision: configData.salesDivision,
        salutation: form.salutation,
        street1: form.street1,
        city: form.city,
        zipcode: form.zipcode,
        mobile: form.mobile,
        country: form.country,
        language: configData.locales[0],
        generateExternalKey: true,
        legalAgreementVersion: "1.2",
        systemName: "KONYWWS",
        updateCustomerFlag: form.updateCustomerFlag,
        partyId: !!form.partyId ? form.partyId : null,
        partyUid: !!form.partyUid ? form.partyUid : null,
        loyaltyActiveFlag: true,
        legalAgreements: [],
        customerCards: [],
        activationDate: moment().format('YYYY-MM-DDThh:mm:ss'),
        clubDateOfEntry: form.clubDateOfEntry || moment().format('YYYY-MM-DDThh:mm:ss'),
        mailConsentFlag: true,
        emailConsentFlag: true,
        phoneConsentFlag: true,
        smsConsentFlag: true,
        emailAddressAdded: false,
        phoneNumberAdded: false
    }
    return customerEnrollData;
}

const CustomerService = {
    selectCustomer,
    generateCiid,
    upsertCustomer,
    isClubCardNumberFormatValid,
    validateCardNumber,
    createCustomerPrintData
};

export default CustomerService;