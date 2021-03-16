import {useState, useEffect} from 'react';
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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
        .string()
        .required('Salutation is required')
});

const CustomerForm = ({customerData, configData, onNewRegistration, onSelectCustomer, onClearForm}) => {

    const useStyles = makeStyles((theme) => ({
        country: {
            marginTop: theme.spacing(4),
            marginRight: theme.spacing(2)
        },
        birthDate: {
            marginTop: theme.spacing(4),
            width: '100%'
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
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(4),
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(4),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        wrapperButtons: {
            paddingTop: '60px !important'
        },
        buttons: {
            marginTop: 20
        }
    }));
    const classes = useStyles();
    const [salutation, setSalutation] = useState('');
    const [country, setCountry] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());

    const formik = useFormik({
        initialValues: {
            firstName: !!customerData ? customerData.firstName : '',
            lastName: !!customerData ? customerData.lastName : '',
            street1: !!customerData ? customerData.street1 : '',
            zipcode: !!customerData ? customerData.zipcode : '',
            city: !!customerData ? customerData.city : '',
            mobile: !!customerData ? customerData.mobile : '',
            email: !!customerData ? customerData.email : ''
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
    });

    useEffect(() => {
        if (!!customerData) {
            setSalutation(customerData.salutation);
            setBirthDate(customerData.birthDate);
            setCountry(customerData.country);
        } else if (Object.entries(configData).length !== 0) {
            setSalutation('');
            setBirthDate(new Date());
            setCountry(configData.locales[0].split('_')[1]);
        }
    }, [customerData, configData])

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };
    const handleBirthDate = (date) => {
        setBirthDate(date.toISOString());
    };
    const handleChangeSalutation = (event) => {
        setSalutation(event.target.value);
    };
    return (
        <form onSubmit={formik.handleSubmit}>
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
                                label="First name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                    </Grid>
                    <TextField
                        className={classes.inputText}
                        fullWidth
                        id="street1"
                        name="street1"
                        label="Street"
                        value={formik.values.street1}
                        onChange={formik.handleChange}
                        error={formik.touched.street1 && Boolean(formik.errors.street1)}
                        helperText={formik.touched.street1 && formik.errors.street1}
                    />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.inputText}
                                fullWidth
                                id="zipcode"
                                name="zipcode"
                                label="Zip Code"
                                value={formik.values.zipcode}
                                onChange={formik.handleChange}
                                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                                helperText={formik.touched.zipcode && formik.errors.zipcode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={8}>
                            <FormControl className={classes.country} fullWidth>
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
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={classes.birthDate}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Birthday"
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
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.wrapperButtons}>
                    <Paper className={classes.paper}>
                        <Button size="large"
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={() => onNewRegistration({...formik.values, country, birthDate, salutation})}>New
                            Club Registration
                        </Button>
                        <Button size="large"
                                className={classes.buttons}
                                variant="contained"
                                color="secondary"
                                onClick={onSelectCustomer}>Search
                        </Button>
                        <Button size="large"
                                className={classes.buttons}
                                onClick={onClearForm}>
                            <DeleteForeverIcon fontSize="small"/> Clear
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </form>
    );
};

export default CustomerForm;