import {Form, Formik} from 'formik';
import * as yup from 'yup';
import TextField from "@material-ui/core/TextField";
import moment from 'moment';

import PostRegistrationSalesSlipInputsStyles from './PostRegistrationSalesSlipInputsStyles'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {useContext, useEffect, useState} from "react";
import {startsWith} from 'lodash';
import SalesDivisionService from "../../shared/services/SalesDivisionService";
import {GlobalContext} from "../../context/GlobalState";
import ConfigService from "../../shared/services/ConfigService";

const PostRegistrationSalesSlipInputs = ({configData}) => {
    const allowThreeDigits = configData?.saleSlipRegistration.allowThreeDigits;
    const slipValidDateRange = configData?.modules.SLIP_VALID_DATE_RANGE || 30;
    const {customerData} = useContext(GlobalContext);
    const [salesDivision, setSalesDivision] = useState(0);
    const [salesDivisionName, setSalesDivisionName] = useState('');
    const [dateFormat, setDateFormat] = useState(configData?.modules.DATE_FORMAT.toUpperCase());


    useEffect(() => {
        setSalesDivision(configData.salesDivision);
        setSalesDivisionName(SalesDivisionService.getSDName(configData.salesDivision));

        if (startsWith(configData?.locales, 'nl_NL'))
            setDateFormat('DD-MM-YY');
        else if (startsWith(configData?.locales, 'sv_SE'))
            setDateFormat('YYYY-MM-DD')
    }, [configData])


    const validationSchema = yup.object({
        slipNo: yup
            .string('Slip number')
            .matches(/^[0-9]{1,5}$/, 'Please fill in the following format: 1-5 digits')
            .required('This field is required'),
        sapOutletId: yup
            .string('Outlet number')
            .matches(/^[a-zA-Z]{1}[0-9]{3}$/, 'Please fill in following format: 1 character and 3 digits')
            .required('This field is required'),
        cashRegisterNo: yup
            .string('Cash register')
            .matches(allowThreeDigits ? /^[0-9]+$/ : /^[0-9]{3}$/, 'Please fill in the following format: 3 digits')
            .required('This field is required'),
        cashierNo: yup
            .string('Cashier')
            .matches(/^[0-9]{1,6}$/, 'Please fill in the following format: 1-6 digits')
            .required('This field is required'),
        slipDate: yup
            .string('Slip date')
            .test('test-name2', 'Please fill in the following format: DD.MM.YYYY', value => validateFormatDate(value))
            .required('This field is required')
            .test('test-name', 'Sales slip is out of range', value => validateSlipDate(value)),
        slipTime: yup
            .string('Time')
            .matches(/^[0-2]{1}?[0-9]{1}:[0-5]{1}?[0-9]{1}$/, 'Please fill in the following format: HH: MM')
            .required('This field is required')
    })

    const validateSlipDate = (value) => {
        const slipDateMom = moment(value, dateFormat, true);
        const validMin = moment().subtract(slipValidDateRange, 'days');
        const validMax = moment();
        return slipDateMom.isBetween(validMin, validMax)
    };
    const validateFormatDate = value => {
        if (!value) return;
        const parts = value.split(/[\/\-\.]/);
        if (parts.length < 3)
            return false;
        const dateValue = new Date(parts[2], parts[1] -1, parts[0]);
        return (dateValue && dateValue.getMonth() === parseInt(parts[1], 10) - 1)
    }

    const classes = PostRegistrationSalesSlipInputsStyles();
    let formFields = {
        slipNo: '',
        sapOutletId: '',
        cashRegisterNo: '',
        cashierNo: '',
        slipDate: '',
        slipTime: ''
    };

    const onSubmit = async (values, actions) => {
        const {slipDate, slipTime, ...rest} = values;
        const salesSlipDate=moment(slipDate  + slipTime, dateFormat +'HH:mm')
        const storeInfo = await ConfigService.getStoreBySapId(values.sapOutletId);
        
        const dataToBeSaved = {
            ...rest,
            ciid: customerData.cardCiid[0],
            createDateTime:salesSlipDate.format(),
            outletId:storeInfo.data.outletPK.id
        }
        await ConfigService.updateSalesSlip(dataToBeSaved)
    }

    return (
        <>
            <Formik initialValues={formFields} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(salesSlipForm) => (
                    <Form className={classes.root}>
                        <p>Please enter the code on the receipt here.</p>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size="small"
                                    className={`${classes.inputText} ${classes.slipNo}`}
                                    fullWidth
                                    id="slipNo"
                                    name="slipNo"
                                    label="Slip number*"
                                    placeholder="1-5 digits"
                                    variant="outlined"
                                    value={salesSlipForm.values.slipNo}
                                    onChange={salesSlipForm.handleChange}
                                    onBlur={salesSlipForm.handleBlur}
                                    error={salesSlipForm.touched.slipNo && Boolean(salesSlipForm.errors.slipNo)}
                                    helperText={salesSlipForm.touched.slipNo && salesSlipForm.errors.slipNo}
                                />
                                <TextField
                                    size="small"
                                    className={`${classes.inputText} ${classes.cashRegisterNo}`}
                                    fullWidth
                                    id="cashRegisterNo"
                                    name="cashRegisterNo"
                                    label="Cash register*"
                                    placeholder="3 digits"
                                    variant="outlined"
                                    value={salesSlipForm.values.cashRegisterNo}
                                    onChange={salesSlipForm.handleChange}
                                    onBlur={salesSlipForm.handleBlur}
                                    error={salesSlipForm.touched.cashRegisterNo && Boolean(salesSlipForm.errors.cashRegisterNo)}
                                    helperText={salesSlipForm.touched.cashRegisterNo && salesSlipForm.errors.cashRegisterNo}
                                />
                                <TextField
                                    size="small"
                                    className={`${classes.inputText} ${classes.slipDate}`}
                                    fullWidth
                                    id="slipDate"
                                    name="slipDate"
                                    label="Slip date*"
                                    placeholder="DD.MM.YYYY"
                                    variant="outlined"
                                    value={salesSlipForm.values.slipDate}
                                    onChange={salesSlipForm.handleChange}
                                    onBlur={salesSlipForm.handleBlur}
                                    error={salesSlipForm.touched.slipDate && Boolean(salesSlipForm.errors.slipDate)}
                                    helperText={salesSlipForm.touched.slipDate && salesSlipForm.errors.slipDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size="small"
                                    className={`${classes.inputText} ${classes.sapOutletId}`}
                                    fullWidth
                                    id="sapOutletId"
                                    name="sapOutletId"
                                    label="Market number*"
                                    placeholder="1 character and 3 digits"
                                    variant="outlined"
                                    value={salesSlipForm.values.sapOutletId}
                                    onChange={salesSlipForm.handleChange}
                                    onBlur={salesSlipForm.handleBlur}
                                    error={salesSlipForm.touched.sapOutletId && Boolean(salesSlipForm.errors.sapOutletId)}
                                    helperText={salesSlipForm.touched.sapOutletId && salesSlipForm.errors.sapOutletId}

                                />
                                <TextField

                                    size="small"
                                    className={`${classes.inputText} ${classes.cashierNo}`}
                                    fullWidth
                                    id="cashierNo"
                                    name="cashierNo"
                                    label="Cashier*"
                                    placeholder="1-6 digits"
                                    variant="outlined"
                                    value={salesSlipForm.values.cashierNo}
                                    onChange={salesSlipForm.handleChange}
                                    onBlur={salesSlipForm.handleBlur}
                                    error={salesSlipForm.touched.cashierNo && Boolean(salesSlipForm.errors.cashierNo)}
                                    helperText={salesSlipForm.touched.cashierNo && salesSlipForm.errors.cashierNo}
                                />
                                <TextField
                                    size="small"
                                    className={`${classes.inputText} ${classes.slipTime}`}
                                    fullWidth
                                    id="slipTime"
                                    name="slipTime"
                                    label="Slip time*"
                                    placeholder="HH: MM"
                                    variant="outlined"
                                    value={salesSlipForm.values.slipTime}
                                    onChange={salesSlipForm.handleChange}
                                    onBlur={salesSlipForm.handleBlur}
                                    error={salesSlipForm.touched.slipTime && Boolean(salesSlipForm.errors.slipTime)}
                                    helperText={salesSlipForm.touched.slipTime && salesSlipForm.errors.slipTime}
                                />
                            </Grid>
                        </Grid>
                        <Button className={classes.saveButton}
                                size="large"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                disabled={!(salesSlipForm.isValid && salesSlipForm.dirty)}
                                type="submit">
                            <SaveIcon fontSize="small"/>
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default PostRegistrationSalesSlipInputs;
