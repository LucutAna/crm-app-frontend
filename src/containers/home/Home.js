import {useContext, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';

import CustomerForm from '../../components/customerForm/CustomerForm';
import SearchInput from '../../components/searchInput/SearchInput';
import EnrollModal from '../../components/modals/enrollModal/EnrollModal';
import CustomerService from '../../shared/services/CustomerService';
import PrintModal from '../../components/modals/printModal/PrintModal';
import {GlobalContext} from '../../context/GlobalState';

const Home = ({configData, onSetOpenSnackbar}) => {
    const [ciid, setCiid] = useState('');
    const [customerRegistrationData, setCustomerRegistrationData] = useState('');
    const [openEnrollModal, setOpenEnrollModal] = useState(false);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');

    const {deleteCustomerData} = useContext(GlobalContext);
    const history = useHistory();
    const customerForm = useRef();


    const handleCiid = (searchCiid) => {
        setCiid(searchCiid);
    }

    const clearSearchInput = () => {
        setCiid('');
    }

    const newRegistration = (customer) => {
        setCustomerRegistrationData(customer);
        if (customer.updateCustomerFlag) {
            const url = CustomerService.getRegistrationPdfUrlInternal(CustomerService.createCustomerPrintData(customer, configData, customer.cardCiid));
            setPdfUrl(url);
        }
        customer.updateCustomerFlag ? setOpenPrintModal(true) : setOpenEnrollModal(true);
    }

    const handleCloseEnrollModal = async (event, data, eKit, consentFlag) => {
        let url = '';
        setOpenEnrollModal(false);

        if (!!data && data === "E-KIT_CARD") {
            setCustomerRegistrationData({...customerRegistrationData, cardCiid: eKit, customerConsentFlag: consentFlag})
            url = CustomerService.getRegistrationPdfUrlInternal(CustomerService.createCustomerPrintData(customerRegistrationData, configData, eKit, consentFlag));
            setOpenPrintModal(true);
        }
        if (!!data && data === "GENERATE_CIID") {
            try {
                let data = {
                    cardTypeCode: 'P', //TODO if it is a eKit card  ask bussines typeCode
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                }
                const card = await CustomerService.generateCiid(data);
                setCustomerRegistrationData({...customerRegistrationData, cardCiid: card.data.ciid, customerConsentFlag: consentFlag});
                url = CustomerService.getRegistrationPdfUrlInternal(CustomerService.createCustomerPrintData(customerRegistrationData, configData, card.data.ciid, consentFlag));
            } catch (error) {
                console.log(error);
            }
            setPdfUrl(url);
            setOpenPrintModal(true);
        }
    }

    const handleClosePrintModal = async (event, data) => {
        if (!!data && data === "SUBMIT") {
            try {
                const customerCreated = await CustomerService.upsertCustomer(customerRegistrationData);
                if ( customerCreated.data.code === "SUCCESS" ) {
                    setOpenPrintModal(false);
                    history.push('/success', {customerRegistrationData})
                }
                deleteCustomerData();
            } catch (error) {
                console.log(error);
            }
        }
        setOpenPrintModal(false);
    }

    const search = () => {
        customerForm.current.search()
    }

    return (
        <>
            <SearchInput onHandleCiid={handleCiid}
                         ciid={ciid}
                         onEnter={search}
                         onSelectCustomer={search}
            />
            <CustomerForm configData={configData}
                          ciid={ciid}
                          onClearSearchInput={clearSearchInput}
                          onNewRegistration={newRegistration}
                          onSetOpenSnackbar={onSetOpenSnackbar}
                          ref={customerForm}
            />
            <EnrollModal openEnrollModal={openEnrollModal}
                         configData={configData}
                         onHandleCloseEnrollModal={handleCloseEnrollModal}
            />
            <PrintModal openPrintModal={openPrintModal}
                        onHandleClosePrintModal={handleClosePrintModal}
                        pdfUrl={pdfUrl}
            />
        </>
    )
}

export default Home;
