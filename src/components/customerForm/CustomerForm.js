import React from 'react';
import {useFormik} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import DateFnsUtils from '@date-io/date-fns';
import './CustomerForm.css';
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
    zipCode: yup
        .string('Enter your zip code')
        .min(5, 'Zip code should be of minimum 5 characters length')
        .required('Zip code is required'),
    city: yup
        .string('Enter your City')
        .min(2, 'City should be of minimum 2 characters length')
        .required('City is required'),
    country: yup
        .string('Enter your Country')
        .min(2, 'Country should be of minimum 2 characters length')
        .required('Country is required'),
    phoneNumber: yup
        .number('Enter your phone')
        .min(5, 'Phone should be of minimum 5 digits length')
        .required('Country is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

const CustomerForm = () => {
    const [country, setCountry] = React.useState('CH');
    const [selectedDate, setSelectedDate] = React.useState(new Date('2000-08-18T21:11:54'));
    const formik = useFormik({
        initialValues: {
            gender: '',
            firstName: '',
            lastName: '',
            street: '',
            zipCode: '',
            city: '',
            country: '',
            birthday: '',
            phoneNumber: '',
            email: ''
        },
        validationSchema: validationSchema
    });
    const useStyles = makeStyles((theme) => ({
        country: {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(2),
            minWidth: 500,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        btnRegistration: {
            marginTop: theme.spacing(2),
        }
    }));
    const classes = useStyles();

    const handleChange = (event) => {
        setCountry(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date.toISOString());
    };
    const submitCustomerData = (data) => {
        const customerData = {...data.values, country, selectedDate}
        console.log(customerData);
    }
    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit} className={classes.formControl}>
                <TextField
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
                    fullWidth
                    id="zipCode"
                    name="zipCode"
                    label="Zip Code"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
                <TextField
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
                        onChange={handleChange}
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Birthday"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <TextField
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
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Button fullWidth
                        className={classes.btnRegistration}
                        color="secondary" variant="contained"
                        type="submit"
                        onClick={() => submitCustomerData(formik)}> New Club Registration
                </Button>
            </form>
        </div>
    );
};


export default CustomerForm;