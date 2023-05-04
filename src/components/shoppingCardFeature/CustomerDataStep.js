import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalState";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    RadioGroup,
    TextField
} from "@material-ui/core";
import {Formik, Field, Form} from "formik";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import ShoppingCardStyle from "./ShoppingCardStyle";
import CustomerService from "../../shared/services/CustomerService";
import * as Yup from 'yup';
import {isEmpty} from "lodash";
import Radio from "@material-ui/core/Radio";
import i18next from "i18next";

const CustomerDataStep = (props, configData) => {
    const classes = ShoppingCardStyle();
    const {customerData} = useContext(GlobalContext);
    const [customer, setCustomer] = useState([]);

    console.log("customer data", customerData);

    useEffect(async () => {
        const configData = props;
        try {
            const data = {
                partyUid: customerData.partyUid,
                salesDivision: configData.salesDivision,
                subsidiary: configData.subsidiary
            }
            const result = await CustomerService.selectCustomer(data);
            setCustomer(result.data);
        } catch (error) {
            console.log(error);
        }
    }, [customerData])

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    console.log('customerData', customerData);

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
        birthDate: customerData.birthDate || new Date()
    };

    // const onSubmit = (values) => {
    //     alert(JSON.stringify(values, null, 2));
    // }

    return (
        <div>
            <Card>
                <CardContent>
                    <Formik
                        onSubmit={(values) => {
                            alert(JSON.stringify(values, null, 2));
                        }}
                        validationSchema={validationSchema}
                        initialValues={{
                            salutation: customerData.salutation,
                            language: customerData.language,
                            firstName: customerData.firstName,
                            lastName: customerData.lastName,
                            birthDate: customerData.birthDate,
                            civilStatus: '',
                            nationality: customerData.country,
                            foreignStatus: '',
                            inChSince: '',
                            email: customerData.email,
                            mobile: customerData.mobile,
                            privatePhoneNumber: '',
                            businessPhoneNumber: '',
                            addressAddOn: '',
                            street1: customerData.street1,
                            zipCode: customerData.zipCode,
                            city: customerData.city,
                            country: customerData.country,
                            residentSince: '',
                            job: '',
                            employer: '',
                            income: '',
                            imprintName: '',
                            employeeName: '',
                            staffNumber: '',
                            saldoGarant: false,
                            unknown: false,
                            copyOfId: false,
                            checkboxNationality: false,
                            checkboxName: false,
                            checkboxBirth: false,
                            checkboxIncome: false
                        }}>
                        {customerForm => (
                        <Form label="Customer data"
                              initialValues={formFields}
                              validationSchema={validationSchema}
                              onSubmit={(values) => {
                                  console.log('values', values)
                              }}
                        >
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={4}>
                                    <label className={classes.labelStyle}>{i18next.t('LBL_PERSONAL_DATA')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid style={{marginLeft: '15px'}}>
                                    <Grid container
                                          direction="row"
                                          justifyContent="flex-start"
                                          alignItems="center"
                                          style={{paddingTop: '20px'}}
                                    >
                                        <RadioGroup
                                            aria-label="gender"
                                            name="salutation"
                                            value={configData.salutation}>
                                            <FormControlLabel value="Mrs." control={<Radio/>}
                                                              label={i18next.t('CMB_MADAM')}/>
                                            <FormControlLabel value="Mr." control={<Radio/>}
                                                              label={i18next.t('CMB_SIR')}/>
                                            <FormControlLabel value="UNKNOWN" control={<Radio/>}
                                                              label={i18next.t('LBL_UNKNOWN')}/>
                                        </RadioGroup>
                                        <select name="language"
                                                style={{marginLeft: '135px'}}
                                        >
                                            <option value="" label="Language"/>
                                            <option value="de" label={i18next.t('LBL_LANGUAGE_de_CH')}/>
                                            <option value="it" label={i18next.t('LBL_LANGUAGE_it_CH')}/>
                                            <option value="fr" label={i18next.t('LBL_LANGUAGE_fr_CH')}/>
                                        </select>
                                    </Grid>
                                    <Grid container
                                          direction="row"
                                          justifyContent="flex-start"
                                          alignItems="center"
                                    >
                                        <Field name="firstName"
                                               style={{marginLeft: '20px'}}
                                               component={TextField}
                                               label={i18next.t('LBL_FIRST_NAME')}
                                               value={customerData.firstName}/>
                                        <Field name="lastName"
                                               style={{marginLeft: '30px'}}
                                               component={TextField}
                                               label={i18next.t('LBL_LAST_NAME')}
                                               value={customerData.lastName}/>
                                    </Grid>
                                    <Grid container
                                          direction="row"
                                          justifyContent="flex-start"
                                          alignItems="center">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                style={{marginLeft: '20px'}}
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label={i18next.t('LBL_DOB')}
                                                format="dd/MM/yyyy"
                                                value={customerData.birthDate}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <Field name="civilStatus"
                                               style={{marginLeft: '25px', marginTop: '7px'}}
                                               component={TextField}
                                               label="Civil Status"/>
                                        <select name="nationality"
                                                style={{marginLeft: '25px', marginTop: '25px'}}>
                                            <option value="" label={i18next.t('LBL_NATIONALITY')}/>
                                            <option value="CH" label="Switzerland"/>
                                            <option value="DE" label="Germany"/>
                                        </select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} style={{paddingTop: '20px'}}>
                                <Grid item xs={12} sm={4}>
                                    <label className={classes.labelStyle}>{i18next.t('LBL_CONTACT_INFO')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center">
                                    <Field name="email"
                                           style={{marginLeft: '20px'}}
                                           component={TextField}
                                           label={i18next.t('LBL_EMAIL')}
                                           value={customerData.email}/>
                                </Grid>

                                <Grid container spacing={4}>
                                    <Grid container
                                          direction="row"
                                          justifyContent="flex-start"
                                          alignItems="center"
                                          style={{paddingTop: '20px'}}>
                                        <Field name="mobile"
                                               style={{marginLeft: '35px'}}
                                               type="text"
                                               component={TextField}
                                               label={i18next.t('LBL_MOBILE_NUMBER')}
                                               value={customerData.mobile}/>
                                        <Field name="privateNumber"
                                               className={classes.inputCustomerData}
                                               type="text"
                                               component={TextField}
                                               label={i18next.t('LBL_TEL_PRIVATE')}/>
                                        <Field name="businessNumber"
                                               className={classes.inputCustomerData}
                                               type="text"
                                               component={TextField}
                                               label={i18next.t('LBL_TEL_BUSINESS')}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} style={{paddingTop: '40px'}}>
                                    <label
                                        className={classes.labelStyle}>{i18next.t('LBL_ACTUAL_ADDRESS')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      style={{paddingTop: '20px'}}>
                                    <Field name="street"
                                           style={{marginLeft: '20px'}}
                                           component={TextField}
                                           label={i18next.t('LBL_STREET')}
                                           value={customerData.street1}/>
                                    <Field name="zipcode"
                                           className={classes.inputCustomerData}
                                           component={TextField}
                                           type="text"
                                           label={i18next.t('LBL_ZIPCODE')}
                                           value={customerData.zipcode}/>
                                    <Field name="city"
                                           className={classes.inputCustomerData}
                                           component={TextField}
                                           label={i18next.t('LBL_CITY')}
                                           value={customerData.city}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} style={{paddingTop: '20px'}}>
                                <Grid container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      style={{paddingTop: '20px'}}>
                                    <select name="land"
                                            style={{marginLeft: '20px', marginBottom: "15px"}}
                                    >
                                        <option value="" label={i18next.t('LBL_COUNTRY')}/>
                                        <option value="CH" label={i18next.t('LBL_COUNTRY_CH')}/>
                                        <option value="LI" label={i18next.t('LBL_COUNTRY_LI')}/>
                                    </select>
                                    <select name="residentperiod"
                                            style={{marginLeft: '115px', marginBottom: "15px"}}
                                    >
                                        <option value="" label={i18next.t('LBL_RESIDENT_SINCE')}/>
                                        <option value=">2years"
                                                label={i18next.t('LBL_SMALLER_THAN_TWO_YEARS_RESIDENCE')}/>
                                        <option value="<2years"
                                                label={i18next.t('LBL_GRATER_THAN_TWO_YEARS_RESIDENCE')}/>
                                    </select>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} style={{paddingTop: '20px'}}>
                                <Grid item xs={8} sm={4}>
                                    <label
                                        className={classes.labelStyle}>{i18next.t('LBL_PROFESSIONAL_DETAILS')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} style={{paddingBottom: '20px'}}>
                                <Grid container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      style={{paddingTop: '10px'}}>
                                    <Field name="job"
                                           component={TextField}
                                           className={classes.inputCustomerData}
                                           label={i18next.t('LBL_JOB')}/>
                                    <Field name="employer"
                                           component={TextField}
                                           className={classes.inputCustomerData}
                                           label={i18next.t('LBL_EMPLOYER')}/>
                                    <Grid container
                                          direction="row"
                                          justifyContent="flex-start"
                                          alignItems="center">
                                        <Field name="income"
                                               component={TextField}
                                               type="number"
                                               className={classes.inputCustomerData}
                                               label={i18next.t('LBL_INCOME')}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                            )}
                        <Form label="Card details"
                              initialValues={{
                                  imprintName: '',
                                  saldoGarant: false,
                                  employeeName: '',
                                  staffNumber: null,
                                  unknown: false
                              }} onSubmit={() => {
                                  console.log('card details');
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={3} sm={4}>
                                    <Field className={classes.cardDetailsFields}
                                           name="imprintName"
                                           component={TextField}
                                           label={i18next.t('LBL_IMPRINT_NAME')}
                                           value={customerData.imprintName}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={3} sm={4}>
                                    <label className={classes.labelStyle}>{i18next.t('LBL_FURTHER_PRODUCTS')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={3} sm={4}>
                                    <label>
                                        <Field type="checkbox"
                                               name="saldoGarant"
                                               value="saldoGarant"/>
                                        {i18next.t('LBL_SALDO_GARANT')}
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                >
                                    <Field className={classes.cardDetailsFields}
                                           name="employeeName"
                                           component={TextField}
                                           label={i18next.t('LBL_EMPLOYEE_NAME')}
                                           value={customerData.employeeName}
                                    />
                                    <Field className={classes.cardDetailsFields}
                                           name="staffNumber"
                                           type="number"
                                           component={TextField}
                                           label={i18next.t('LBL_STAFF_NUMBER')}
                                           value={customerData.staffNumber}
                                    />
                                    <label className={classes.checkboxCardDetails}>
                                        <Field type="checkbox"
                                               name="unknown"
                                               value="unknown"/>
                                        {i18next.t('LBL_UNKNOWN')}
                                    </label>
                                </Grid>
                            </Grid>
                        </Form>
                        <Form label="Summary"
                              initialValues={{
                                  language: customerData.language,
                                  salutation: customerData.salutation,
                                  firstName: customerData.firstName,
                                  lastName: customerData.lastName,
                                  birthDate: customerData.birthDate,
                                  civilStatus: '',
                                  nationality: ''
                              }} onSubmit={() => {
                                  console.log('summary');
                        }}>
                            <Grid container spacing={4}>
                                <label className={classes.labelStyle}>{i18next.t('LBL_PERSONAL_DATA')}</label>
                            </Grid>
                            <Grid container spacing={2} style={{display: "flex", flexDirection: "column"}}>
                                <Grid item xs={3} sm={4}>
                                    <Field name="Language"
                                           component={TextField}
                                           label={i18next.t('LBL_LANGUAGE')}
                                           value={customerData.language}
                                    />
                                    <Field name="Salutation"
                                           component={TextField}
                                           label={i18next.t('LBL_TITLE')}
                                           value={customerData.salutation}
                                    />
                                    <Field name="firstName"
                                           component={TextField}
                                           label={i18next.t('LBL_FIRST_NAME')}
                                           value={customerData.firstName}
                                    />
                                    <Field name="lastName"
                                           component={TextField}
                                           label={i18next.t('LBL_LAST_NAME')}
                                           value={customerData.lastName}
                                    />
                                    <Field name="birthDate"
                                           component={TextField}
                                           label={i18next.t('LBL_DOB')}
                                           value={customerData.birthDate}
                                    />
                                    <Field name="civil"
                                           component={TextField}
                                           label={i18next.t('LBL_STATUS')}
                                           value={customerData.civilStatus}
                                    />
                                    <Field name="nationality"
                                           component={TextField}
                                           label={i18next.t('LBL_NATIONALITY')}
                                           value={customerData.nationality}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <label className={classes.labelStyle} style={{paddingTop: '20px'}}>{i18next.t('LBL_CONTACT_INFO')}</label>
                            </Grid>
                            <Grid container spacing={2} style={{display: "flex", flexDirection: "column"}}>
                                <Grid item xs={3} sm={4}>
                                    <Field name="email"
                                           component={TextField}
                                           label={i18next.t('LBL_EMAIL')}
                                           value={customerData.email}
                                    />
                                    <Field name="mobile"
                                           component={TextField}
                                           label={i18next.t('LBL_TEL_MOBILE')}
                                           value={customerData.mobile}
                                    />
                                    <Field name="privateNumber"
                                           component={TextField}
                                           label={i18next.t('LBL_TEL_PRIVATE')}
                                    />
                                    <Field name="businessNumber"
                                           component={TextField}
                                           label={i18next.t('LBL_TEL_BUSINESS')}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <label className={classes.labelStyle} style={{paddingTop: '20px'}}>{i18next.t('LBL_ACTUAL_ADDRESS')}</label>
                            </Grid>
                            <Grid container spacing={2} style={{display: "flex", flexDirection: "column"}}>
                                <Grid item xs={3} sm={4}>
                                    <Field name="addressAddon"
                                           component={TextField}
                                           label={i18next.t('LBL_ADDRESS_ADDON')}
                                           value={customerData.addressAddOn}
                                    />
                                    <Field name="street"
                                           component={TextField}
                                           label={i18next.t('LBL_STREET')}
                                           value={customerData.street1}
                                    />
                                    <Field name="zipcode"
                                           component={TextField}
                                           label={i18next.t('LBL_ZIPCODE')}
                                           type="text"
                                           value={customerData.zipcode}
                                    />
                                    <Field name="city"
                                           component={TextField}
                                           label={i18next.t('LBL_CITY')}
                                           type="text"
                                           value={customerData.city}
                                    />
                                    <Field name="country"
                                           component={TextField}
                                           label={i18next.t('LBL_COUNTRY')}
                                           value={customerData.country}
                                    />
                                    <Field name="residentSince"
                                           component={TextField}
                                           label={i18next.t('LBL_RESIDENT_SINCE')}
                                           value={customerData.residentSince}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                        <Form label="Checklist"
                              initialValues={{
                                  checkNationality: false,
                                  checkCopyId: false,
                                  checkBirthDate: false,
                                  checkIncome: false
                              }} onSubmit={() => {
                                  console.log('checklist');
                        }}>
                            <Grid container spacing={4}>
                                <Grid style={{paddingLeft: "27px", paddingBottom: '20px'}}>
                                    <label>{i18next.t('LBL_CHECK_COLLECTED_DATA')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist}>
                                    <Checkbox id="checkCopyId"/>
                                    <label>{i18next.t('LBL_COPY_OF_ID')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist}>
                                    <Checkbox id="checkNationality"/>
                                    <label>{i18next.t('LBL_NATIONALITY')}</label>
                                    <label> CH</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist}>
                                    <Checkbox/>
                                    <label>{i18next.t('LBL_LAST_NAME_AND_FIRST_NAME')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist}>
                                    <Checkbox id="checkBirthDate"/>
                                    <label>{i18next.t('LBL_DOB')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist}>
                                    <Checkbox id="checkIncome"/>
                                    <label>{i18next.t('LBL_INCOME')}</label>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default CustomerDataStep;
