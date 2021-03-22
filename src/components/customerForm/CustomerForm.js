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
        .required('Email is required')
});

const CustomerForm = ({ciid, configData, onNewRegistration, onClearForm}) => {

    const classes = CustomerFormStyles();
    const [salutation, setSalutation] = useState('');
    const [country, setCountry] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [customerInfo, setCustomerInfo] = useState('');

    const initialValues = {
        firstName: '',
        lastName: '',
        street1: '',
        zipcode: '',
        city: '',
        mobile: '',
        email: ''
    };
    // const formik = useFormik({
    //     initialValues: {
    //         firstName: !!customerData ? customerData.firstName : '',
    //         lastName: !!customerData ? customerData.lastName : '',
    //         street1: !!customerData ? customerData.street1 : '',
    //         zipcode: !!customerData ? customerData.zipcode : '',
    //         city: !!customerData ? customerData.city : '',
    //         mobile: !!customerData ? customerData.mobile : '',
    //         email: !!customerData ? customerData.email : ''
    //     },
    //     enableReinitialize: true,
    //     validationSchema: validationSchema,
    //     onSubmit: (values) => {
    //         onNewRegistration({...values, country, birthDate, salutation})
    //     },
    // });

    // const [user, setUser] = useState({});
    // const [showPassword, setShowPassword] = useState(false);
    //
    // useEffect(() => {
    //     if (!isAddMode) {
    //         // get user and set form fields
    //         userService.getById(id).then(user => {
    //             const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
    //             fields.forEach(field => setFieldValue(field, user[field], false));
    //             setUser(user);
    //         });
    //     }
    // }, []);

    const search = async (props) => {
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
                let customerResult = removeEmpty(customer.data);
                const fields = ['firstName', 'lastName', 'email', 'street1', 'zipcode', 'city', 'mobile'];
                fields.forEach(field => props.setFieldValue(field, customerResult[field], false));
            } catch (error) {
                console.log(error)
            }

        }
    }


    // const search = async (props) => {
    //     await onSelectCustomer();
    //     const fields = ['firstName', 'lastName', 'email', 'street1', 'zipcode', 'city', 'mobile'];
    //     if (!!customerData) {
    //         const data = customerData;
    //         console.log('DATA', data);
    //     }
    //     //fields.forEach(field => props.setFieldValue(field, customerData[field], false));
    // }

    const removeEmpty = (data) => {
        Object.entries(data).forEach(([key, val]) =>
            (val && typeof val === 'object') && removeEmpty(val) || (val === null || val === "") && delete data[key]
        );
        return data;
    };

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

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };
    const handleBirthDate = (date) => {
        setBirthDate(date.toISOString());
    };
    const handleChangeSalutation = (event) => {
        setSalutation(event.target.value);
    };

    const onSubmit = (values, actions) => {
        console.log(values);
        console.log(1111, actions);
        onNewRegistration({...values, country, birthDate, salutation})
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {props => (
                <Form>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={8}>
                            <RadioGroup className={classes.gender}
                                        aria-label="gender"
                                        name="salutation"
                                        value={salutation}
                                        onChange={handleChangeSalutation}>
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
                                        value={props.values.firstName}
                                        onChange={props.handleChange}
                                        error={props.touched.firstName && Boolean(props.errors.firstName)}
                                        helperText={props.touched.firstName && props.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.inputText}
                                        fullWidth
                                        id="lastName"
                                        name="lastName"
                                        label="Last name*"
                                        value={props.values.lastName}
                                        onChange={props.handleChange}
                                        error={props.touched.lastName && Boolean(props.errors.lastName)}
                                        helperText={props.touched.lastName && props.errors.lastName}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                className={classes.inputText}
                                fullWidth
                                id="street1"
                                name="street1"
                                label="Street*"
                                value={props.values.street1}
                                onChange={props.handleChange}
                                error={props.touched.street1 && Boolean(props.errors.street1)}
                                helperText={props.touched.street1 && props.errors.street1}
                            />
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.inputText}
                                        fullWidth
                                        id="zipcode"
                                        name="zipcode"
                                        label="Zip Code*"
                                        value={props.values.zipcode}
                                        onChange={props.handleChange}
                                        error={props.touched.zipcode && Boolean(props.errors.zipcode)}
                                        helperText={props.touched.zipcode && props.errors.zipcode}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.inputText}
                                        fullWidth
                                        id="city"
                                        name="city"
                                        label="City*"
                                        value={props.values.city}
                                        onChange={props.handleChange}
                                        error={props.touched.city && Boolean(props.errors.city)}
                                        helperText={props.touched.city && props.errors.city}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={8}>
                                    <FormControl className={classes.country} fullWidth>
                                        <InputLabel shrink>Country*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id='country'
                                            value={country}
                                            onChange={handleChangeCountry}
                                            displayEmpty
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="DE">
                                                <em>DE</em>
                                            </MenuItem>
                                            <MenuItem value='CH'>CH</MenuItem>
                                            <MenuItem value='AT'>AT</MenuItem>
                                            <MenuItem value='PL'>PL</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                        value={props.values.mobile}
                                        onChange={props.handleChange}
                                        error={props.touched.mobile && Boolean(props.errors.mobile)}
                                        helperText={props.touched.mobile && props.errors.mobile}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.inputText}
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email*"
                                        value={props.values.email}
                                        onChange={props.handleChange}
                                        error={props.touched.email && Boolean(props.errors.email)}
                                        helperText={props.touched.email && props.errors.email}
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
                                        onClick={() => search(props)}>
                                    <SearchIcon fontSize="small"/>
                                    Search
                                </Button>
                                <Button variant="contained" size="large"
                                        className={classes.buttons}
                                        onClick={onClearForm}>
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