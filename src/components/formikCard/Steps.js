import React from "react";
import {useContext, useState} from "react";
import {Field, ErrorMessage, useFormikContext} from "formik";
import {GlobalContext} from "../../context/GlobalState";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {FormControlLabel, RadioGroup, TextField, Checkbox,} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import i18next from "i18next";
import styles from './styles';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


const StepOne = ({activeStep, setActiveStep, customerForm}) => {
    const {customerData} = useContext(GlobalContext);
    const classes = styles();
    const {errors, touched} = useFormikContext();
    // const [language, setLanguage] = useState('');

    // const handleChange = (event) => {
    //   setLanguage(event.target.value);
    // };

    return (
        <Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <label className={classes.labelStyle}>{i18next.t('LBL_PERSONAL_DATA')}</label>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={4}
                          className={classes.radioGrid}
                    >
                        <RadioGroup
                            aria-label="gender"
                            name="salutation"
                            onChange={customerForm.handleChange}
                            row>
                            <FormControlLabel value="Mrs." control={<Radio/>} label={i18next.t('CMB_MADAM')}/>
                            <FormControlLabel value="Mr." control={<Radio/>} label={i18next.t('CMB_SIR')}/>
                            <FormControlLabel value="UNKNOWN" control={<Radio/>} label={i18next.t('LBL_UNKNOWN')}/>
                        </RadioGroup>
                        <select name="language" className={classes.languageSelect}>
                            <option value="" label="Language"/>
                            <option value="de" label={i18next.t('LBL_LANGUAGE_de_CH')}/>
                            <option value="it" label={i18next.t('LBL_LANGUAGE_it_CH')}/>
                            <option value="fr" label={i18next.t('LBL_LANGUAGE_fr_CH')}/>
                        </select>
                    </Grid>
                    <Grid container
                          direction="row"
                          spacing={4}>
                        <Grid item xs={6}>
                            <Field
                                id="firstName"
                                name="firstName"
                                label={i18next.t('LBL_FIRST_NAME')}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.firstName && Boolean(customerForm.errors.firstName)}
                                helperText={customerForm.touched.firstName && customerForm.errors.firstName}
                            />
                            <ErrorMessage name="customerData.firstName" component="div" className="error"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                id="lastName"
                                name="lastName"
                                label={i18next.t('LBL_LAST_NAME')}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.lastName && Boolean(customerForm.errors.lastName)}
                                helperText={customerForm.touched.lastName && customerForm.errors.lastName}
                            />
                            <ErrorMessage name="customerData.lastName" component="div" className="error"/>
                        </Grid>
                    </Grid>
                    <Grid container
                          direction="row"
                          spacing={4}
                          alignItems="flex-end">
                        <Grid item xs={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label={i18next.t('LBL_DOB')}
                                    format="dd/MM/yyyy"
                                    onChange={value => customerForm.setFieldValue("birthDate", value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    error={customerForm.touched.birthDate && Boolean(customerForm.errors.birthDate)}
                                    helperText={customerForm.touched.birthDate && customerForm.errors.birthDate}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                id="civilStatus"
                                name="civilStatus"
                                className={classes.civilStatusField}
                                label="Civil Status"
                                onChange={customerForm.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <select name="nationality" className={classes.nationalitySelect}>
                                <option value="" label={i18next.t('LBL_NATIONALITY')}/>
                                <option value="CH" label="Switzerland"/>
                                <option value="DE" label="Germany"/>
                            </select>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={4} style={{paddingTop: '20px'}}>
                <Grid item xs={6} sm={4}>
                    <label className={classes.labelStyle}>{i18next.t('LBL_CONTACT_INFO')}</label>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center">
                        <Grid item xs={6}>
                            <Field name="email"
                                   style={{width: '100%'}}
                                   className={classes.emailField}
                                   label={i18next.t('LBL_EMAIL')}
                                   onChange={customerForm.handleChange}
                                   error={customerForm.touched.email && Boolean(customerForm.errors.email)}
                                   helperText={customerForm.touched.email && customerForm.errors.email}
                            />
                            <ErrorMessage name="customerData.email" component="div" className="error"/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row"
                          spacing={4}
                    >
                        <Grid item xs={4}>
                            <Field
                                id="mobile"
                                name="mobile"
                                type="text"
                                label={i18next.t('LBL_MOBILE_NUMBER')}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.mobile && Boolean(customerForm.errors.mobile)}
                                helperText={customerForm.touched.mobile && customerForm.errors.mobile}
                            />
                            <ErrorMessage name="customerData.mobile" component="div" className="error"/>
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                id="privateNumber"
                                name="privateNumber"
                                className={classes.inputCustomerDataPrivateNumber}
                                type="text"
                                label={i18next.t('LBL_TEL_PRIVATE')}
                                onChange={customerForm.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                id="businessNumber"
                                name="businessNumber"
                                className={classes.inputCustomerDataContactInfo}
                                type="text"
                                label={i18next.t('LBL_TEL_BUSINESS')}
                                onChange={customerForm.handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} style={{paddingTop: '40px'}}>
                <label
                    className={classes.labelStyle}>{i18next.t('LBL_ACTUAL_ADDRESS')}</label>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container
                          direction="row"
                          spacing={4}
                          style={{paddingTop: '20px'}}>
                        <Grid item xs={12}>
                            <Field
                                id="street1"
                                name="street1"
                                label={i18next.t('LBL_STREET')}
                                className={classes.inputCustomerDataContactInfo}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.street1 && Boolean(customerForm.errors.street1)}
                                helperText={customerForm.touched.street1 && customerForm.errors.street1}
                            />
                            <ErrorMessage name="customerData.street1" component="div" className="error"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="zipcode"
                                id="zipcode"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_ZIPCODE')}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.zipcode && Boolean(customerForm.errors.zipcode)}
                                helperText={customerForm.touched.zipcode && customerForm.errors.zipcode}
                            />
                            <ErrorMessage name="customerData.zipcode" component="div" className="error"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                id="city"
                                name="city"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_CITY')}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.city && Boolean(customerForm.errors.city)}
                                helperText={customerForm.touched.city && customerForm.errors.city}
                            />
                            <ErrorMessage name="customerData.city" component="div" className="error"/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={4} style={{paddingTop: '20px'}}>
                <Grid item xs={8}>
                    <Grid container
                          direction="row"
                          spacing={4}>
                        <Grid item xs={6}>
                            <select name="land" style={{width: '100%'}}>
                                <option value="" label={i18next.t('LBL_COUNTRY')}/>
                                <option value="CH" label={i18next.t('LBL_COUNTRY_CH')}/>
                                <option value="LI" label={i18next.t('LBL_COUNTRY_LI')}/>
                            </select>
                        </Grid>
                        <Grid item xs={6}>
                            <select name="residentperiod"
                                    style={{width: '100%'}}
                            >
                                <option value="" label={i18next.t('LBL_RESIDENT_SINCE')}/>
                                <option value=">2years" label={i18next.t('LBL_SMALLER_THAN_TWO_YEARS_RESIDENCE')}/>
                                <option value="<2years" label={i18next.t('LBL_GRATER_THAN_TWO_YEARS_RESIDENCE')}/>
                            </select>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} style={{paddingTop: '40px'}}>
                <label
                    className={classes.labelStyle}>{i18next.t('LBL_PREVIOUS_ADDRESS')}</label>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container
                          direction="row"
                          spacing={4}
                          style={{paddingTop: '20px'}}>
                        <Grid item xs={12}>
                            <Field name="street"
                                   label={i18next.t('LBL_STREET')}
                                   value={customerData.street1}
                                   className={classes.inputCustomerDataContactInfo}/>
                            <ErrorMessage name="customerData.street1" component="div" className="error"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field name="zipcode"
                                   className={classes.inputCustomerDataContactInfo}
                                   type="number"
                                   label={i18next.t('LBL_ZIPCODE')}
                                   value={customerData.zipcode}/>
                            <ErrorMessage name="customerData.zipcode" component="div" className="error"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field name="city"
                                   className={classes.inputCustomerDataContactInfo}
                                   label={i18next.t('LBL_CITY')}
                                   value={customerData.city}/>
                            <ErrorMessage name="customerData.city" component="div" className="error"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container
                                  direction="row"
                                  spacing={4}>
                                <Grid item xs={8}>
                                    <select name="land" style={{width: '100%'}}>
                                        <option value="" label={i18next.t('LBL_COUNTRY')}/>
                                        <option value="CH" label={i18next.t('LBL_COUNTRY_CH')}/>
                                        <option value="LI" label={i18next.t('LBL_COUNTRY_LI')}/>
                                    </select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={4} style={{paddingTop: '20px'}}>
                <Grid item xs={8} sm={4}>
                    <label className={classes.labelStyle}>{i18next.t('LBL_PROFESSIONAL_DETAILS')}</label>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container
                          direction="row"
                          spacing={4}>
                        <Grid item xs={6}>
                            <Field name="job"
                                   className={classes.inputCustomerDataContactInfo}
                                   label={i18next.t('LBL_JOB')}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field name="employer"
                                   className={classes.inputCustomerDataContactInfo}
                                   label={i18next.t('LBL_EMPLOYER')}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field name="income"
                                   type="number"
                                   className={classes.inputCustomerDataContactInfo}
                                   label={i18next.t('LBL_INCOME')}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div>
            </div>
        </Grid>
    );
};

const StepTwo = ({activeStep, setActiveStep, customerForm}) => {
    const classes = styles();
    return (
        <Grid>
            <Grid container spacing={4}>
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <Field
                            id="imprintName"
                            name="imprintName"
                            style={{marginLeft: '20px'}}
                            className={classes.emailField}
                            label={i18next.t('LBL_IMPRINT_NAME')}
                            oncChange={customerForm.handleChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid container direction="row">
                    <Grid item xs={6} style={{paddingTop: '40px'}}>
                        <label className={classes.labelStyle}>{i18next.t('LBL_FURTHER_PRODUCTS')}</label>
                    </Grid>
                    <Grid container direction="column" style={{paddingTop: '20px'}}>
                        <Grid item xs={4} className={classes.checklist}>
                            <Checkbox id="guaranteed"/>
                            <label>{i18next.t('LBL_COPY_OF_ID')}</label>
                        </Grid>
                        <Grid item xs={4} className={classes.checklist}>
                            <Checkbox id="checkCopyId"/>
                            <label>{i18next.t('LBL_COPY_OF_ID')}</label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container direction="row" spacing={4}>
                        <Grid item xs={4}>
                            <Field
                                id="name"
                                name="name"
                                style={{marginLeft: '8px'}}
                                type="text"
                                label={i18next.t('LBL_EMPLOYEE_NAME')}
                                onChange={customerForm.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                id="staffNumber"
                                name="staffNumber"
                                className={classes.inputCustomerDataPrivateNumber}
                                type="number"
                                label={i18next.t('LBL_STAFF_NUMBERE')}
                                onChange={customerForm.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4} style={{marginTop: '10px'}}>
                            <Checkbox id="checkCopyId"/>
                            <label>{i18next.t('LBL_COPY_OF_ID')}</label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{paddingTop: '20px'}}>
            </div>
        </Grid>
    );
};

const StepThree = ({activeStep, setActiveStep, customerForm}) => {
    return (
        <div>
            <h2>Step 3</h2>
            <label htmlFor="address">Address:</label>
            <Field type="text" name="address"/>
            <ErrorMessage name="address" component="div"/>

            <label htmlFor="city">City:</label>
            <Field type="text" name="city"/>
            <ErrorMessage name="city" component="div"/>
            <div>
            </div>
        </div>
    );
};

const StepFour = ({activeStep, setActiveStep, onSubmit}) => {
    return (
        <div>
            <h2>Step 4</h2>
            <label htmlFor="message">Message:</label>
            <Field as="textarea" name="message"/>
            <ErrorMessage name="message" component="div"/>
            <div>
            </div>
        </div>
    );
};

export {StepOne, StepTwo, StepThree, StepFour};
