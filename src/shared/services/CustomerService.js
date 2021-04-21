import axiosInstance from '../../axiosInstance';
import {BASE_URL} from '../utils/constants';
import moment from 'moment';
import {map, trim, isEmpty, isNil, omitBy} from 'lodash';

const selectCustomer = data => {
    return axiosInstance.post(`/crm-customer/selectCustomer/`, data);
}

const searchCustomer = data => {
    return axiosInstance.post(`/crm-customer/searchCustomer/`, data);
}

const generateCiid = data => {
    return axiosInstance.post(`/crm-customer/cards/generate`, data);
}

const upsertCustomer = data => {
    return axiosInstance.post(`/crm-customer/upsertCustomer/`, data);
}

const validateCardNumber = data => {
    return axiosInstance.post(`/crm-customer/cards/validate`, data);
}

const getRegistrationPdfUrlInternal = customerData => {
    let url = `${BASE_URL}/crm-sales/getRegistrationPDF/`;
    url = url + '?' + Object.keys(customerData).map(function (key) {
        return key + '=' + encodeURIComponent(customerData[key]);
    }).join('&');
    return url;
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
};

const createCustomerUpsertData = (form, configData) => {
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
        customerConsentFlag: form.customerConsentFlag,
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
        phoneNumberAdded: false,
    }
    return customerEnrollData;
};

const createCustomerPrintData = (customer, configData, cardCiid, consentFlag) => {
    let storeStreet2 = "";
    let storeTelNumber = "";
    const pdfSettings = configData.pdfSettings;
    if (pdfSettings) {
        if (pdfSettings.displayMarketStreet2) {
            storeStreet2 = configData.storeAddress.addressField_2;//$filter('translate')('LBL_STREET2') + ': ' +
        }
        // if (pdfSettings.displayMarketPhoneNumber) {
        //     storeTelNumber = $filter('translate')('TXT_PHONE_SHORT') + ': ' + store.storeAddress.phoneNumber;
        // }
    }

    const storeValuesArray = map([
        configData.storeName,
        configData.storeAddress.addressField_1,
        storeStreet2,
        configData.storeAddress.zipcode + ' ' + configData.storeAddress.city,
        storeTelNumber,
    ]);
    const storeValues = storeValuesArray.filter(val => !!val).join('\n');

    // Quirky logic to fill in crefid or mobile.
    let fieldMobile;
    if (customer.country === 'SE')
        fieldMobile = customer.crefid;
    else if (customer.country === 'TR')
        fieldMobile = customer.crefid;
    else
        fieldMobile = customer.mobile;

    //let emailPermission = false;
    //TODO for update customer
    // if ($rootScope.form.permissions) {
    //     let permissionsKey = lodash.find(Object.keys($rootScope.form.permissions), (key) => {
    //         return key.indexOf('CLUB') >= 0
    //     });
    //     emailPermission = $rootScope.form.permissions[permissionsKey].permissionChannels.emailConsentFlag;
    // }

    let pendingEmailPermission = false;
    //TODO for update customer
    // if ($rootScope.initialPermissions && $rootScope.initialPermissions.emailConsentPending) {
    //     pendingEmailPermission = true;
    // }

    //fieldTitle: customer.title,

    let defaults = {
        subsidiary: trim(configData.subsidiary),
        // ToDo: create filter for that sales division mapping
        salesDivision: configData.salesDivision,
        locale: configData.locales[0],
        fieldSalutation: customer.salutation,
        fieldLastName: customer.lastName,
        fieldFirstName: customer.firstName,
        fieldDateOfBirth: moment(customer.birthDate).format(configData.modules.DATE_FORMAT.toUpperCase()),
        fieldTodaysDate: moment(new Date()).format(configData.modules.DATE_FORMAT.toUpperCase()),
        fieldStreet: customer.street1,
        fieldAddressExtra: customer.street2,
        fieldPostalCode: customer.zipcode,
        fieldCity: customer.city,
        fieldDistrict: customer.district,
        fieldQuarter: customer.quarter,
        fieldHouseNoSeparated: customer.houseNoSeparated,
        fieldStreetNameSeparated: customer.streetNameSeparated,
        fieldApartmentNoSeparated: customer.apartmentNoSeparated,
        fieldCountry: customer.country,
        fieldMobile: fieldMobile,
        fieldMobile1: customer.mobile,
        fieldEmail: customer.email,
        fieldCardNumber: cardCiid,
        fieldStore: storeValues,
        'marketingContactPermitted.newCustomer': isEmpty(customer.ccrCiid),
        'marketingContactPermitted.customerConsentFlag': isNil(consentFlag) ? customer.customerConsentFlag : consentFlag,
        'marketingContactPermitted.emailAddressAdded': !isEmpty(customer.email),
        'marketingContactPermitted.phoneNumberAdded': !isEmpty(customer.mobile),
        'marketingContactPermitted.emailPending': pendingEmailPermission,
        outletId: configData.storeNumber,
        isClubMemberReadOnly: customer.clubMemberActiveFlag
    };

    return omitBy(defaults, isNil);
}

const CustomerService = {
    selectCustomer,
    searchCustomer,
    generateCiid,
    upsertCustomer,
    isClubCardNumberFormatValid,
    validateCardNumber,
    createCustomerUpsertData,
    createCustomerPrintData,
    getRegistrationPdfUrlInternal
};

export default CustomerService;