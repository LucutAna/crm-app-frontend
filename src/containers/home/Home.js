import {useState} from 'react';
import moment from "moment";
import {Redirect} from "react-router-dom";

import CustomerForm from "../../components/customerForm/CustomerForm";
import SearchInput from "../../components/searchInput/SearchInput";
import EnrollModal from "../../components/modals/enrollModal/EnrollModal";
import CustomerService from "../../shared/services/CustomerService";
import PrintModal from "../../components/modals/printModal/PrintModal";

const Home = ({configData, onSetOpenSnackbar}) => {
    const [ciid, setCiid] = useState('');
    const [customerRegistrationData, setCustomerRegistrationData] = useState('');
    const [openEnrollModal, setOpenEnrollModal] = useState(false);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [customerRegistration, setCustomerRegistration] = useState({});
    const [redirect, setRedirect] = useState(null);


    const handleCiid = (searchCiid) => {
        setCiid(searchCiid);
    }

    const clearSearchInput = () => {
        setCiid('');
    }

    const newRegistration = (customer) => {
        setCustomerRegistrationData(customer)
        if (!!ciid) {
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
            birthDate: customerRegistrationData.birthDate,
            email: customerRegistrationData.email,
            firstName: customerRegistrationData.firstName,
            lastName: customerRegistrationData.lastName,
            memberCardFlag: true,
            clubMemberActiveFlag: true,
            customerConsentFlag: true,
            outletId: configData.storeNumber,
            preferredOutlet: customerRegistrationData.preferredOutlet || configData.storeNumber,
            salesDivision: configData.salesDivision,
            salutation: customerRegistrationData.salutation,
            street1: customerRegistrationData.street1,
            city: customerRegistrationData.city,
            zipcode: customerRegistrationData.zipcode,
            mobile: customerRegistrationData.mobile,
            country: customerRegistrationData.country,
            language: configData.locales[0],
            generateExternalKey: true,
            legalAgreementVersion: "1.2",
            systemName: "KONYWWS",
            updateCustomerFlag: !!customerRegistrationData.partyId || !!customerRegistrationData.partyUid ? true : null,
            partyId: !!customerRegistrationData.partyId ? customerRegistrationData.partyId : null,
            partyUid: !!customerRegistrationData.partyUid ? customerRegistrationData.partyUid : null,
            loyaltyActiveFlag: true,
            legalAgreements: [],
            customerCards: [],
            activationDate: moment().format('YYYY-MM-DDThh:mm:ss'),
            clubDateOfEntry: customerRegistrationData.clubDateOfEntry || moment().format('YYYY-MM-DDThh:mm:ss'),
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
                         ciid={ciid}/>
            <CustomerForm configData={configData}
                          ciid={ciid}
                          onClearSearchInput={clearSearchInput}
                          onNewRegistration={newRegistration}
                          onSetOpenSnackbar={onSetOpenSnackbar}/>
            <EnrollModal openEnrollModal={openEnrollModal}
                         configData={configData}
                         onHandleCloseEnrollModal={handleCloseEnrollModal}/>
            <PrintModal openPrintModal={openPrintModal}
                        onHandleClosePrintModal={handleClosePrintModal}/>
        </>
    )
}

export default Home;