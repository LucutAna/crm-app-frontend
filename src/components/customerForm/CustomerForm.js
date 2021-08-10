import {Formik, Form} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CustomerFormStyles from './CustomerFormStyles'
import CustomerService from '../../shared/services/CustomerService';
import {cloneDeep, extend, find, get, isEmpty, isNil, isUndefined, pick, pickBy} from 'lodash';
import {forwardRef, useContext, useImperativeHandle, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';

import {GlobalContext} from '../../context/GlobalState';
import CustomersModal from '../modals/customersModal/customersModal';

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .min(2, 'First name should be of minimum 2 characters length')
        .required('First name is required'),
    lastName: yup
        .string('Enter your last name')
        .min(2, 'Last name should be of minimum 2 characters length')
        .required('Last name is required'),
    street1: yup
        .string('Enter your street')
        .min(2, 'Street should be of minimum 2 characters length')
        .required('Street is required'),
    zipcode: yup
        .string('Enter your zip code')
        .min(5, 'Zip code should be of minimum 5 characters length')
        .required('Zip code is required'),
    city: yup
        .string('Enter your City')
        .min(2, 'City should be of minimum 2 characters length')
        .required('City is required'),
    mobile: yup
        .number('Enter your phone')
        .nullable()
        .min(5, 'Phone should be of minimum 5 digits length'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    salutation: yup
        .string('Enter salutation')
        .required('Salutation is required'),
    country: yup
        .string('Enter your country')
        .required('Country is required'),
    birthDate: yup
        .date()
        .nullable()
        .test('test-name', 'The customer must be over 18 years old ',
            value => {
                const age = getAge(value);
                const minAge = 18;
                return age >= minAge
            })
        .required('Birth Date is required')
});


const getAge = value => {
    let today = new Date();
    let birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
    return age;
};

const disableUserInput = (form) => {
    if (isEmpty(form.partyUid)) {
        return false;
    } else if (form.firstName && form.lastName && form.birthDate) {
        // this flag is used by backend to be aware that it is an existing customer
        form.updateCustomerFlag = true;
        return true;
    }
    return false;
};

//TODO for CH
// const getMinAge = country => {
//     if (country === "CH") return 16;
//     return 18;
//};

const validateCustomerOnSearchByName = (customer) => {
    if (!customer)
        return false;

    if (isEmpty(customer.firstName) || isEmpty(customer.lastName)) {
        return false;
    }
    let hasStreet = get(customer, 'street1', false);
    let hasStreetSeparated = get(customer, 'streetNameSeparated', false) || get(customer, 'houseNoSeparated ', false);
    let hasEmail = get(customer, 'email', false);
    let hasMobile = get(customer, 'mobile', false);
    let hasBirthDate = get(customer, 'birthDate', false);
    let hasDobZipCode = get(customer, 'birthDate', false) && get(customer, 'zipcode', false);
    return hasStreet || hasStreetSeparated || hasEmail || hasMobile || hasDobZipCode || hasBirthDate;
};

const CustomerForm = forwardRef(({ciid, configData, onNewRegistration, onClearSearchInput, onSetOpenSnackbar}, ref) => {
    const classes = CustomerFormStyles();
    const history = useHistory();
    const {
        addCustomer,
        customerData,
        deleteCustomerData,
        deleteTransactions
    } = useContext(GlobalContext);
    const [customersDataResult, setCustomersDataResult] = useState([]);
    const [openSpinner, setOpenSpinner] = useState(false);
    const [openCustomersModal, setOpenCustomersModal] = useState(false);
    const [form, setForm] = useState({});

    const customerFormRef = useRef();

    useImperativeHandle(ref, () => ({

        search() {
            searchCiid();
        }

    }));

    let formFields = {
        firstName: customerData.firstName || '',
        lastName: customerData.lastName || '',
        street1: customerData.street1 || '',
        zipcode: customerData.zipcode || '',
        city: customerData.city || '',
        mobile: customerData.mobile || '',
        email: customerData.email || '',
        salutation: customerData.salutation || 'Mrs.',
        country: isEmpty(customerData) ? Object.entries(configData).length !== 0 ? configData.locales[0].split('_')[1] : '' : customerData.country,
        birthDate: customerData.birthDate || new Date(),
        partyUid: customerData.partyUid || null,
        partyId: customerData.partyId || null,
        updateCustomerFlag: false
    };

    const searchCiid = async () => {
        if (CustomerService.isClubCardNumberFormatValid(ciid, configData.salesDivision, configData.subsidiary)) {
            //clear global objects
            deleteCustomerData();
            deleteTransactions();

            try {
                let data = {
                    ciid,
                    searchCiid: ciid,
                    storeId: configData.storeNumber,
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                };
                const customerSelected = await CustomerService.selectCustomer(data);
                const customer = pickBy(customerSelected.data);
                if (isUndefined(customer.firstName)) {
                    let message = 'No customer data could be found with the entered search criteria';
                    let open = true;
                    let code = 'warning';
                    setOpenSpinner(false);
                    onSetOpenSnackbar({open, message, code});
                    return
                }
                ;
                addCustomer({...customerSelected.data});
                customerFormRef.current.resetForm(formFields);
                //fil customer for with data from CCR
                Object.keys(formFields).forEach(field => customerFormRef.current.setFieldValue(field, customer[field], false));
                setOpenSpinner(false);
                //redirect to dashboard page
                if (!isNil(customerSelected.data.firstName) && customerSelected.status === 200) {
                    history.push('/dashboard');
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            let message = 'Please enter a valid customer card number';
            let open = true;
            let code = 'warning';
            setOpenSpinner(false);
            onSetOpenSnackbar({open, message, code});
        }
    }

    const search = async (customerForm) => {
        setOpenSpinner(true);
        setForm({...customerForm});
        if (ciid) {
            await searchCiid()
        } else {
            let errCount = 0;
            let cust = cloneDeep(customerForm.values);

            if (!isNil(customerForm.values.birthDate)) {
                // Normalize date of birth for CCR and avoid hours set to 23 what causes after ISO conversion that the day is set to one day in the past caused by timezones.
                new Date(customerForm.values.birthDate).setHours(12);
                cust.birthDate = (moment().format("YYYY/MM/DD") !== moment(customerForm.values.birthDate).format("YYYY/MM/DD")) ? moment(customerForm.values.birthDate).toISOString() : '';
            }
            if (!validateCustomerOnSearchByName(cust)) {
                setOpenSpinner(false);
                let message = 'When searching, please enter at least the first and last name of the customer and at least one additional piece of information (email address, street and house number, date of birth and zip code, mobile number';
                let open = true;
                let code = 'warning';
                onSetOpenSnackbar({open, message, code});
                errCount++;
            }

            if (errCount > 0)
                return;

            cust.phone = customerForm.values.mobile;
            try {
                const config = {
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                };
                const searchFields = pick(cust, ['firstName', 'lastName', 'birthDate', 'street1', 'zipcode', 'city', 'email', 'phone']);
                let data = extend(config, searchFields);
                const customerResult = await CustomerService.searchCustomer(data);
                if (isEmpty(customerResult.data)) {
                    setOpenSpinner(false);
                    let message = 'No customer data could be found with the entered search criteria';
                    let open = true;
                    let code = 'info';
                    onSetOpenSnackbar({open, message, code});
                }
                ;
                setCustomersDataResult(customerResult.data);
                setOpenSpinner(false);
                setOpenCustomersModal(true);

            } catch (error) {
                console.log(error);
                setOpenSpinner(false);
            }
        }
    };

    const selectCustomer = async customerInfo => {
        setOpenCustomersModal(false);
        setOpenSpinner(true);
        try {
            const data = {
                partyUid: customerInfo.partyUid,
                partyId: customerInfo.partyId,
                storeId: configData.storeNumber,
                salesDivision: configData.salesDivision,
                subsidiary: configData.subsidiary
            };
            const customerSelected = await CustomerService.selectCustomer(data);
            const customer = pickBy(customerSelected.data);
            addCustomer({...customerSelected.data});
            //fil customer for with data from CCR
            Object.keys(formFields).forEach(field => form.setFieldValue(field, customer[field], false));
            setOpenSpinner(false);
            //redirect to dashboard page
            if (!isNil(customerSelected.data.firstName) && customerSelected.status === 200) {
                history.push('/dashboard');
            }

        } catch (error) {
            console.log(error);
            setOpenSpinner(false);
        }
    };

    const handleCloseCustomersModal = () => {
        setOpenCustomersModal(false);
    };

    const clearFormFields = (customerForm) => {
        deleteCustomerData();
        deleteTransactions();
        onClearSearchInput();
        customerForm.resetForm(formFields);
    }

    const onSubmit = (values, actions) => {
        //use consent flag from selectCustomer response
        let consentFlag = false;
        if (!isEmpty(customerData)) {
            let permissionsKey = find(Object.keys(customerData.permissions), (key) => {
                return key.indexOf('CLUB') >= 0
            });
            consentFlag = customerData.permissions[permissionsKey].permissionChannels.customerConsentFlag;
        }
        const enrollCustomer = !values.updateCustomerFlag ? CustomerService.createCustomerUpsertData(values, configData) : CustomerService.createCustomerUpsertData({
            ...customerData,
            street1: values.street1,
            zipcode: values.zipcode,
            city: values.city,
            mobile: values.mobile,
            country: values.country,
            updateCustomerFlag: values.updateCustomerFlag,
            customerConsentFlag: consentFlag
        }, configData);
        onNewRegistration({...enrollCustomer})
    };

    return (
        <>
            <Formik initialValues={formFields}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    innerRef={customerFormRef}
            >
                {customerForm => (
                    <Form>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={8}>
                                <RadioGroup className={classes.gender}
                                            aria-label="gender"
                                            name="salutation"
                                            value={customerForm.values.salutation}
                                            onChange={customerForm.handleChange}
                                >
                                    <FormControlLabel value="Mrs." disabled={disableUserInput(customerForm.values)}
                                                      control={<Radio/>} label="Mrs."/>
                                    <FormControlLabel value="Mr." disabled={disableUserInput(customerForm.values)}
                                                      control={<Radio/>} label="Mr."/>
                                </RadioGroup>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.inputText}
                                            fullWidth
                                            id="firstName"
                                            name="firstName"
                                            label="First name*"
                                            disabled={disableUserInput(customerForm.values)}
                                            value={customerForm.values.firstName}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.firstName && Boolean(customerForm.errors.firstName)}
                                            helperText={customerForm.touched.firstName && customerForm.errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.inputText}
                                            fullWidth
                                            id="street1"
                                            name="street1"
                                            label="Street*"
                                            value={customerForm.values.street1}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.street1 && Boolean(customerForm.errors.street1)}
                                            helperText={customerForm.touched.street1 && customerForm.errors.street1}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.inputText}
                                            fullWidth
                                            id="lastName"
                                            name="lastName"
                                            label="Last name*"
                                            disabled={disableUserInput(customerForm.values)}
                                            value={customerForm.values.lastName}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.lastName && Boolean(customerForm.errors.lastName)}
                                            helperText={customerForm.touched.lastName && customerForm.errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.inputText}
                                            fullWidth
                                            id="zipcode"
                                            name="zipcode"
                                            label="Zip Code*"
                                            value={customerForm.values.zipcode}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.zipcode && Boolean(customerForm.errors.zipcode)}
                                            helperText={customerForm.touched.zipcode && customerForm.errors.zipcode}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                className={`${classes.birthDate} ${classes.inputText}`}
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Birthday*"
                                                format="dd/MM/yyyy"
                                                disabled={disableUserInput(customerForm.values)}
                                                value={customerForm.values.birthDate}
                                                onChange={value => customerForm.setFieldValue("birthDate", value)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                error={customerForm.touched.birthDate && Boolean(customerForm.errors.birthDate)}
                                                helperText={customerForm.touched.birthDate && customerForm.errors.birthDate}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.inputText}
                                            fullWidth
                                            id="city"
                                            name="city"
                                            label="City*"
                                            value={customerForm.values.city}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.city && Boolean(customerForm.errors.city)}
                                            helperText={customerForm.touched.city && customerForm.errors.city}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            className={classes.inputText}
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email*"
                                            disabled={disableUserInput(customerForm.values)}
                                            value={customerForm.values.email}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.email && Boolean(customerForm.errors.email)}
                                            helperText={customerForm.touched.email && customerForm.errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            className={classes.inputText}
                                            fullWidth
                                            id="mobile"
                                            name="mobile"
                                            label="Phone number"
                                            value={customerForm.values.mobile}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.mobile && Boolean(customerForm.errors.mobile)}
                                            helperText={customerForm.touched.mobile && customerForm.errors.mobile}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            className={classes.country}
                                            fullWidth
                                            id="standard-select-currency"
                                            name="country"
                                            select
                                            label="Country*"
                                            value={customerForm.values.country}
                                            onChange={customerForm.handleChange}
                                            error={customerForm.touched.country && Boolean(customerForm.errors.country)}
                                            helperText={customerForm.touched.country && customerForm.errors.country}
                                        >
                                            {Object.entries(configData).length !== 0 ?
                                                configData.allowedCountries.map((option, index) => (
                                                    <MenuItem key={index} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                )) :
                                                <children/>
                                            }
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.wrapperButtons}>
                                <Paper className={classes.paper}>
                                    <Button size="large"
                                            variant="contained"
                                            color="primary"
                                            type="submit">
                                        <CreditCardIcon fontSize="small"/>
                                        New Club Registration
                                    </Button>
                                    <Button size="large"
                                            className={classes.buttons}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => search(customerForm)}>
                                        <SearchIcon fontSize="small"/>
                                        Search
                                    </Button>
                                    <Button variant="contained" size="large"
                                            className={classes.buttons}
                                            onClick={() => clearFormFields(customerForm)}>
                                        <DeleteForeverIcon fontSize="small"/>
                                        Clear
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <CustomersModal openCustomersModal={openCustomersModal}
                            onHandleCloseCustomersModal={handleCloseCustomersModal}
                            onSelectCustomer={selectCustomer}
                            customersData={customersDataResult}/>
            <Backdrop className={classes.backdrop} open={openSpinner}>
                <CircularProgress size='160px' color="primary" thickness={7}/>
            </Backdrop>
        </>
    );
});

export default CustomerForm;