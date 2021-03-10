import React from 'react';
import {useState} from 'react';
import {useFormik} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
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
// import Button from "@material-ui/core/Button";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .min(2, 'First name should be of minimum 2 characters length')
        .required('First name is required'),
    lastName: yup
        .string('Enter your last name')
        .min(2, 'Last name should be of minimum 2 characters length')
        .required('Last name is required'),
    street: yup
        .string('Street your last name')
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
    phoneNumber: yup
        .number('Enter your phone')
        .min(5, 'Phone should be of minimum 5 digits length')
        .required('Country is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    salutation: yup
        .string()
        .required('Salutation is required')
});

const CustomerForm = ({customerData}) => {

    const useStyles = makeStyles((theme) => ({
        country: {
            marginTop: theme.spacing(4),
            marginRight: theme.spacing(2),
            minWidth: 500,
        },
        birthDate: {
            marginTop: theme.spacing(4),
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        gender: {
          flexDirection: 'row',
        },
        btnRegistration: {
            marginTop: theme.spacing(2),
        },
        inputText: {
            marginTop: theme.spacing(2)
        }
    }));
    const classes = useStyles();
    const [salutation, setSalutation] = useState('');
    const [country, setCountry] = useState('DE');
    const [birthDate, setBirthDate] = useState(new Date('2000-08-18T21:11:54'));
    // const formik = useFormik({
    //     initialValues: {
    //         firstName: '',
    //         lastName: '',
    //         street: '',
    //         zipcode: '',
    //         city: '',
    //         phoneNumber: '',
    //         email: ''
    //     },
    //     validationSchema: validationSchema,
    //     enableReinitialize: true,
    // });



    const formik = useFormik({
        initialValues: {
            firstName: !!customerData ? customerData.firstName : '',
            lastName: !!customerData ?  customerData.lastName : '',
            street: !!customerData ?  customerData.street1 : '',
            zipCode: !!customerData ?  customerData.zipcode : '',
            city: !!customerData ? customerData.city: '',
            phoneNumber: !!customerData ? customerData.mobile : '',
            email: !!customerData ?  customerData.email : ''
        },
        enableReinitialize: true,
        validationSchema: validationSchema
    });

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };
    const handleBirthDate = (date) => {
        setBirthDate(date.toISOString());
    };
    const handleChangeSalutation = (event) => {
        setSalutation(event.target.value);
    };
    // const submitCustomerData = (data) => {
    //     const customerData = {...data.values, country, birthDate, salutation}
    //     console.log(1111, customerData);
    // }
    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit} >
                <RadioGroup className={classes.gender}
                            aria-label="gender"
                            name="salutation"
                            value={salutation}
                            onChange={handleChangeSalutation}>
                    <FormControlLabel value="Mrs." control={<Radio />} label="Mrs." />
                    <FormControlLabel value="Mr." control={<Radio />} label="Mr." />
                </RadioGroup>
                <TextField
                    className={classes.inputText}
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                    className={classes.inputText}
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                    className={classes.inputText}
                    fullWidth
                    id="street"
                    name="street"
                    label="Street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={formik.touched.street && Boolean(formik.errors.street)}
                    helperText={formik.touched.street && formik.errors.street}
                />
                <TextField
                    className={classes.inputText}
                    fullWidth
                    id="zipCode"
                    name="zipCode"
                    label="Zip Code"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                    helperText={formik.touched.zipcode && formik.errors.zipcode}
                />
                <TextField
                    className={classes.inputText}
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
                <FormControl className={classes.country}>
                    <InputLabel shrink>Country</InputLabel>
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
                <MuiPickersUtilsProvider  utils={DateFnsUtils} >
                    <KeyboardDatePicker
                        className={classes.birthDate}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Birthday"
                        format="MM/dd/yyyy"
                        value={birthDate}
                        onChange={handleBirthDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    className={classes.inputText}
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
                <TextField
                    className={classes.inputText}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                {/*<Button fullWidth*/}
                {/*        className={classes.btnRegistration}*/}
                {/*        color="secondary" variant="contained"*/}
                {/*        type="submit"*/}
                {/*        onClick={() => submitCustomerData(formik)}> New Club Registration*/}
                {/*</Button>*/}
            </form>
        </div>
    );
};


export default CustomerForm;