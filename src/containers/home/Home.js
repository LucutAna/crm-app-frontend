import Grid from '@material-ui/core/Grid';
import {useState} from 'react';
import axios from 'axios';

import CustomerForm from "../../components/customerForm/CustomerForm";
import RegistrationButtons from "../../components/registrationButtons/RegistrationButtons";
import SearchInput from "../../components/searchInput/SearchInput";
import EnrollDialog from "../../components/modals/EnrollDialog";
import CustomerService from "../../shared/services/CustomerService";

const Home = ({configData}) => {
    const [searchCiid, setSearchCiid] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newCustomerData, setNewCustomerData] = useState('');
    const [creation, setCreation] = useState(false);


    const selectCustomerByCiid = async () => {
        let data = {
            ciid: searchCiid,
            salesDivision: configData.salesDivision,
            searchCiid: searchCiid,
            storeId: configData.storeNumber,
            subsidiary: configData.subsidiary
        };
        const customer = await CustomerService.selectCustomer(data);
        setCustomerData(customer.data);
    }

    const handleCiid = (ciid) => {
        setSearchCiid(ciid);
    }

    // const selectCustomer = async (ciid) => {
    //     const response = await axios.post(`/crm-customer/selectCustomer/`, {
    //         ciid: ciid,
    //         salesDivision: configData.salesDivision,
    //         searchCiid: ciid,
    //         storeId: configData.storeNumber,
    //         subsidiary: configData.subsidiary
    //     });
    //     return await response.data;
    // }

    const clearForm = () => {
        setCustomerData('');
    }

    const newRegistration = () => {
        // let newCustomer = {
        //     firstName: 'Cristian',
        //     lastName: 'Test',
        //     street1: 'TEST',
        //     zipcode: 80331,
        //     city: 'TEST',
        //     phoneNumber: 789789222,
        //     email: 'test@chiriac.com',
        //     salutation: 'Mr',
        //     country: 'DE',
        //     birthDate: '2000-01-01T10:00:00.000Z',
        // }
        // setOpenDialog(true);

        console.log('NEW CLUB REGISTRATION BUTTON CLICKED');
        setCreation(true);
        // setCreation(false) -> metoda asta trebuie apelata dupa ce se incheie procesul de register
        console.log('NEW CUSTOMER: ', newCustomerData);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                    <SearchInput onHandleCiid={handleCiid}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CustomerForm customerData={customerData}
                                  setNewCustomerData={setNewCustomerData}
                                  creation={creation}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <RegistrationButtons onSelectCustomer={selectCustomerByCiid}
                                         onClearForm={clearForm}
                                         onNewRegistration={newRegistration}/>
                </Grid>
            </Grid>
            <EnrollDialog onOpenDialog={openDialog}
                          onHandleCloseDialog={handleCloseDialog}/>
        </>
    )
}

export default Home;