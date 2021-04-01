import {useState, useContext} from 'react';
import {Redirect} from "react-router-dom";

import CustomerForm from "../../components/customerForm/CustomerForm";
import SearchInput from "../../components/searchInput/SearchInput";
import EnrollModal from "../../components/modals/enrollModal/EnrollModal";
import CustomerService from "../../shared/services/CustomerService";
import PrintModal from "../../components/modals/printModal/PrintModal";
import {GlobalContext} from '../../context/GlobalState';

const Home = ({configData, onSetOpenSnackbar}) => {
    const [ciid, setCiid] = useState('');
    const [customerRegistrationData, setCustomerRegistrationData] = useState('');
    const [openEnrollModal, setOpenEnrollModal] = useState(false);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const {deleteCustomerData} = useContext(GlobalContext);


    const handleCiid = (searchCiid) => {
        setCiid(searchCiid);
    }

    const clearSearchInput = () => {
        setCiid('');
    }

    const newRegistration = (customer) => {
        setCustomerRegistrationData(customer);
        customer.updateCustomerFlag ? setOpenPrintModal(true) : setOpenEnrollModal(true);
    }

    const handleCloseEnrollModal = async (event, data, eKit) => {
        if (!!data && data === "E-KIT_CARD") {
            setCustomerRegistrationData({...customerRegistrationData, cardCiid: eKit})
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
                setCustomerRegistrationData({...customerRegistrationData, cardCiid: card.data.ciid})
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
                const customerCreated = await CustomerService.upsertCustomer(customerRegistrationData);
                setRedirect(customerCreated.data.code === "SUCCESS");
                deleteCustomerData();
            } catch (error) {
                console.log(error);
            }
        }
        setOpenPrintModal(false);
    }


    return (
        <>
            {redirect ? <Redirect to={{pathname: "/success", state: {customerRegistrationData}}}/> : null}
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