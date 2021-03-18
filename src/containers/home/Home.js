import {useState} from 'react';
import moment from "moment";
import {Redirect} from "react-router-dom";

import CustomerForm from "../../components/customerForm/CustomerForm";
import SearchInput from "../../components/searchInput/SearchInput";
import EnrollModal from "../../components/modals/enrollModal/EnrollModal";
import CustomerService from "../../shared/services/CustomerService";
import PrintModal from "../../components/modals/printModal/PrintModal";

const Home = ({configData}) => {
    const [ciid, setCiid] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [openEnrollModal, setOpenEnrollModal] = useState(false);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [customerRegistration, setCustomerRegistration] = useState({});
    const [redirect, setRedirect] = useState(null);

    const selectCustomerByCiid = async () => {
        if (CustomerService.isClubCardNumberFormatValid(ciid, configData.salesDivision, configData.subsidiary)) {
            try {
                let data = {
                    ciid,
                    searchCiid: ciid,
                    storeId: configData.storeNumber,
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                };
                const customer = await CustomerService.selectCustomer(data);
                setCustomerData(customer.data);
                setCiid(customer.data.cardCiid[0]);
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('error');
        }
    }

    const handleCiid = (searchCiid) => {
        setCiid(searchCiid);
    }

    const clearForm = () => {
        setCustomerData('');
        setCiid('');
    }

    const newRegistration = (customer) => {
        setCustomerData(customer)
        if (!!ciid && !!customerData) {
            setOpenPrintModal(true);
            createCustomerPrintData(ciid);
        } else {
            setOpenEnrollModal(true);
        }
    }

    const handleCloseEnrollModal = async (event, data, eKit) => {
        if (!!data && data === "E-KIT_CARD") {
            createCustomerPrintData(eKit);
            setOpenPrintModal(true);
        }
        if (!!data && data === "GENERATE_CIID") {
            try {
                let data = {
                    cardTypeCode: 'P',
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                }
                const cardCiid = await CustomerService.generateCiid(data);
                createCustomerPrintData(cardCiid.data.ciid);
            } catch (error) {
                console.log(error);
            }
            setOpenPrintModal(true);
        }
        setOpenEnrollModal(false);
    }

    const handleClosePrintModal = async (event, data) => {
        if (!!data && data === "SUBMIT") {
            try {
                const customerCreated = await CustomerService.upsertCustomer(customerRegistration);
                setRedirect(customerCreated.data.code === "SUCCESS");
            } catch (error) {
                console.log(error);
            }
        }
        setOpenPrintModal(false);
    }

    const createCustomerPrintData = (ciid) => {
        let customerPrintData = {
            subsidiary: configData.subsidiary,
            cardCiid: ciid,
            crefid: null,
            birthDate: customerData.birthDate,
            email: customerData.email,
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            memberCardFlag: true,
            clubMemberActiveFlag: true,
            customerConsentFlag: true,
            outletId: configData.storeNumber,
            preferredOutlet: customerData.preferredOutlet || configData.storeNumber,
            salesDivision: configData.salesDivision,
            salutation: customerData.salutation,
            street1: customerData.street1,
            city: customerData.city,
            zipcode: customerData.zipcode,
            mobile: customerData.mobile,
            country: customerData.country,
            language: configData.locales[0],
            generateExternalKey: true,
            legalAgreementVersion: "1.2",
            systemName: "KONYWWS",
            updateCustomerFlag: !!customerData.partyId || !!customerData.partyUid ? true : null,
            partyId: !!customerData.partyId ? customerData.partyId : null,
            partyUid: !!customerData.partyUid ? customerData.partyUid : null,
            loyaltyActiveFlag: true,
            legalAgreements: [],
            customerCards: [],
            activationDate: moment().format('YYYY-MM-DDThh:mm:ss'),
            clubDateOfEntry: customerData.clubDateOfEntry || moment().format('YYYY-MM-DDThh:mm:ss'),
            mailConsentFlag: true,
            emailConsentFlag: true,
            phoneConsentFlag: true,
            smsConsentFlag: true,
            emailAddressAdded: false,
            phoneNumberAdded: false
        }
        setCustomerRegistration(customerPrintData);
    }

    return (
        <>
            {redirect ? <Redirect to={{pathname: "/success", state: {customerRegistration}}}/> : null}
            <SearchInput onHandleCiid={handleCiid}
                         onSelectCustomer={selectCustomerByCiid}
                         ciid={ciid}/>
            <CustomerForm customerData={customerData}
                          configData={configData}
                          onSelectCustomer={selectCustomerByCiid}
                          onClearForm={clearForm}
                          onNewRegistration={newRegistration}/>
            <EnrollModal openEnrollModal={openEnrollModal}
                         configData={configData}
                         onHandleCloseEnrollModal={handleCloseEnrollModal}/>
            <PrintModal openPrintModal={openPrintModal}
                        onHandleClosePrintModal={handleClosePrintModal}/>
        </>
    )
}

export default Home;