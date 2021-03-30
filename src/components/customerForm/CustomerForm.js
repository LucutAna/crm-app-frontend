import {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CustomerFormStyles from './CustomerFormStyles'
import CustomerService from "../../shared/services/CustomerService";

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
        .required('Country is required')
});

const CustomerForm = ({ciid, configData, onNewRegistration, onClearSearchInput, onSetOpenSnackbar}) => {

    const formFields = {
        firstName: '',
        lastName: '',
        street1: '',
        zipcode: '',
        city: '',
        mobile: '',
        email: '',
        salutation: '',
        country: Object.entries(configData).length !== 0 ? configData.locales[0].split('_')[1] : ''
    };

    const classes = CustomerFormStyles();
    const [birthDate, setBirthDate] = useState(new Date());

    useEffect(() => {
        console.log(configData);

    }, [configData])

    const search = async (customerForm) => {
        if (CustomerService.isClubCardNumberFormatValid(ciid, configData.salesDivision, configData.subsidiary)) {
            try {
                let data = {
                    ciid,
                    searchCiid: ciid,
                    storeId: configData.storeNumber,
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                };
                const customerSelected = await CustomerService.selectCustomer(data);
                const customer = removeEmpty(customerSelected.data)
                Object.keys(formFields).forEach(field => customerForm.setFieldValue(field, customer[field], false));
                ;
            } catch (error) {
                console.log(error)
            }
        } else {
            let message = 'For the search, please use a valid Club Card Number';
            let open = true;
            let code = 'warning'
            onSetOpenSnackbar({open, message, code});
        }
    }

    const clearFormFields = (customerForm) => {
        onClearSearchInput();
        customerForm.resetForm(formFields);
    }


    // useEffect(() => {
    //     if (!!customerData) {
    //         setSalutation(customerData.salutation);
    //         setBirthDate(customerData.birthDate);
    //         setCountry(customerData.country);
    //     } else if (Object.entries(configData).length !== 0) {
    //         setSalutation('');
    //         setBirthDate(new Date());
    //         setCountry(configData.locales[0].split('_')[1]);
    //     }
    // }, [customerData, configData])

    // const handleChangeCountry = (event) => {
    //     setCountry(event.target.value);
    // };
    const handleBirthDate = (date) => {
        setBirthDate(date.toISOString());
    };

    const onSubmit = (values, actions) => {
        console.log(values);
        console.log(1111, actions);
        onNewRegistration({...values, birthDate})
    };

    const removeEmpty = (data) => {
        Object.entries(data).forEach(([key, val]) =>
            (val && typeof val === 'object') && removeEmpty(val) || (val === null || val === "") && delete data[key]
        );
        return data;
    };

    return (
        <Formik initialValues={formFields} validationSchema={validationSchema} onSubmit={onSubmit}>
            {customerForm => (
                <Form>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={8}>
                            <RadioGroup className={classes.gender}
                                        aria-label="gender"
                                        name="salutation"
                                        value={customerForm.values.salutation}
                                        onChange={customerForm.handleChange}
                                        error={customerForm.touched.salutation && Boolean(customerForm.errors.salutation)}
                            >
                                <FormControlLabel value="Mrs." control={<Radio/>} label="Mrs."/>
                                <FormControlLabel value="Mr." control={<Radio/>} label="Mr."/>
                            </RadioGroup>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.inputText}
                                        fullWidth
                                        id="firstName"
                                        name="firstName"
                                        label="First name*"
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
                                        id="lastName"
                                        name="lastName"
                                        label="Last name*"
                                        value={customerForm.values.lastName}
                                        onChange={customerForm.handleChange}
                                        error={customerForm.touched.lastName && Boolean(customerForm.errors.lastName)}
                                        helperText={customerForm.touched.lastName && customerForm.errors.lastName}
                                    />
                                </Grid>
                            </Grid>
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
                            <Grid container spacing={4}>
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
                                <Grid item xs={12} sm={8}>
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
                                        { Object.entries(configData).length !== 0 &&
                                            configData.allowedCountries.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                            {option}
                                            </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className={classes.birthDate}
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Birthday*"
                                            format="dd/MM/yyyy"
                                            value={birthDate}
                                            onChange={handleBirthDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.inputText}
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email*"
                                        value={customerForm.values.email}
                                        onChange={customerForm.handleChange}
                                        error={customerForm.touched.email && Boolean(customerForm.errors.email)}
                                        helperText={customerForm.touched.email && customerForm.errors.email}
                                    />
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

    );
};

export default CustomerForm;