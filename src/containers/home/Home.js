import {useState} from 'react';

import CustomerForm from "../../components/customerForm/CustomerForm";
import SearchInput from "../../components/searchInput/SearchInput";
import EnrollDialog from "../../components/modals/EnrollDialog";
import CustomerService from "../../shared/services/CustomerService";

const Home = ({configData}) => {
    const [ciid, setCiid] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [openDialog, setOpenDialog] = useState(false);


    const selectCustomerByCiid = async () => {
        let data = {
            ciid,
            searchCiid: ciid,
            salesDivision: configData.salesDivision,
            storeId: configData.storeNumber,
            subsidiary: configData.subsidiary
        };
        const customer = await CustomerService.selectCustomer(data);
        setCustomerData(customer.data);
        setCiid(customer.data.cardCiid[0]);
    }

    const handleCiid = (searchCiid) => {
        setCiid(searchCiid);
    }

    const clearForm = () => {
        setCustomerData('');
        setCiid('');
    }

    const newRegistration = (customer) => {
        // setOpenDialog(true);
        setCustomerData(customer)
        console.log('NEW CUSTOMER:', customer);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <SearchInput onHandleCiid={handleCiid} ciid={ciid}/>
            <CustomerForm customerData={customerData}
                          configData={configData}
                          onSelectCustomer={selectCustomerByCiid}
                          onClearForm={clearForm}
                          onNewRegistration={newRegistration}/>
            <EnrollDialog onOpenDialog={openDialog}
                          onHandleCloseDialog={handleCloseDialog}/>
        </>
    )
}

export default Home;