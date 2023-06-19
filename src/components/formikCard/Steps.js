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
import TextFieldWrapper from "./TextFieldWrapper";


const StepOne = ({customerForm}) => {
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
                                component={TextFieldWrapper}
                                label={i18next.t('LBL_FIRST_NAME')}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.firstName && Boolean(customerForm.errors.firstName)}
                                helperText={customerForm.touched.firstName && customerForm.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                id="lastName"
                                name="lastName"
                                component={TextFieldWrapper}
                                label={i18next.t('LBL_LAST_NAME')}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.lastName && Boolean(customerForm.errors.lastName)}
                                helperText={customerForm.touched.lastName && customerForm.errors.lastName}
                            />
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
                                label={i18next.t('LBL_STATUS')}
                                component={TextFieldWrapper}
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
                            <Field
                                name="email"
                                id="email"
                                label={i18next.t('LBL_EMAIL')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                className={classes.inputCustomerDataContactInfo}
                                error={customerForm.touched.email && Boolean(customerForm.errors.email)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                          direction="row"
                          spacing={4}
                    >
                        <Grid item xs={4}>
                            <Field
                                name="mobile"
                                id="mobile"
                                label={i18next.t('LBL_MOBILE_NUMBER')}
                                component={TextFieldWrapper}
                                onChange={customerForm.onChange}
                                className={classes.inputCustomerDataContactInfo}
                                error={customerForm.touched.mobile && Boolean(customerForm.errors.mobile)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                id="privateNumber"
                                name="privateNumber"
                                type="text"
                                label={i18next.t('LBL_TEL_PRIVATE')}
                                component={TextFieldWrapper}
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
                                component={TextFieldWrapper}
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
                                component={TextFieldWrapper}
                                className={classes.inputCustomerDataContactInfo}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.street1 && Boolean(customerForm.errors.street1)}
                                helperText={customerForm.touched.street1 && customerForm.errors.street1}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="zipcode"
                                id="zipcode"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_ZIPCODE')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.zipcode && Boolean(customerForm.errors.zipcode)}
                                helperText={customerForm.touched.zipcode && customerForm.errors.zipcode}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                id="city"
                                name="city"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_CITY')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.city && Boolean(customerForm.errors.city)}
                                helperText={customerForm.touched.city && customerForm.errors.city}
                            />
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
                    className={classes.labelStyle}>{i18next.t('LBL_PREVIOUS_ADDRESS')}
                </label>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container
                          direction="row"
                          spacing={4}
                          style={{paddingTop: '20px'}}>
                        <Grid item xs={12}>
                            <Field
                                name="street"
                                id="street"
                                label={i18next.t('LBL_STREET')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                className={classes.inputCustomerDataContactInfo}
                                error={customerForm.touched.street1 && Boolean(customerForm.errors.street1)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="zipcode"
                                id="zipcode"
                                className={classes.inputCustomerDataContactInfo}
                                type="number"
                                label={i18next.t('LBL_ZIPCODE')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.zipcode && Boolean(customerForm.errors.zipcode)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="city"
                                id="city"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_CITY')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.city && Boolean(customerForm.errors.city)}
                            />
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
                            <Field
                                name="job"
                                id="job"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_JOB')}
                                component={TextFieldWrapper}
                                onChange={customerForm.onChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="employer"
                                id="employer"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_EMPLOYER')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="income"
                                id="income"
                                type="number"
                                className={classes.inputCustomerDataContactInfo}
                                label={i18next.t('LBL_INCOME')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{paddingTop: '20px'}}>
            </div>
        </Grid>
    );
};

const StepTwo = ({customerForm}) => {
    const classes = styles();
    return (
        <Grid>
            <Grid container>
                <Grid container direction="row">
                    <Grid item xs={6}>
                        <Field
                            id="imprintName"
                            name="imprintName"
                            style={{marginLeft: '20px'}}
                            className={classes.emailField}
                            label={i18next.t('LBL_IMPRINT_NAME')}
                            component={TextFieldWrapper}
                            onChange={customerForm.handleChange}
                            error={customerForm.touched.imprintName && Boolean(customerForm.errors.imprintName)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid container direction="row">
                    <Grid item xs={4} style={{paddingTop: '40px'}}>
                        <label className={classes.labelStyle}>{i18next.t('LBL_FURTHER_PRODUCTS')}</label>
                    </Grid>
                    <Grid container direction="column" style={{paddingTop: '20px'}}>
                        <Grid item xs={4} className={classes.checklist}>
                            <Checkbox id="saldoGarant"/>
                            <label>{i18next.t('LBL_SALDO_GARANT')}</label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Grid container direction="row" spacing={4}>
                        <Grid item xs={6}>
                            <Field
                                id="name"
                                name="name"
                                style={{marginLeft: '8px'}}
                                type="text"
                                label={i18next.t('LBL_EMPLOYEE_NAME')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.name && Boolean(customerForm.errors.name)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                id="staffNumber"
                                name="staffNumber"
                                className={classes.inputCustomerDataContactInfoStep2}
                                type="number"
                                label={i18next.t('LBL_STAFF_NUMBERE')}
                                component={TextFieldWrapper}
                                onChange={customerForm.handleChange}
                                error={customerForm.touched.staffNumber && Boolean(customerForm.errors.staffNumber)}
                            />
                        </Grid>
                        <Grid item xs={4} style={{marginTop: '10px'}}>
                            <Checkbox id="unknown"/>
                            <label>{i18next.t('LBL_UNKNOWN')}</label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{paddingTop: '20px'}}>
            </div>
        </Grid>
    );
};

const StepThree = ({customerForm}) => {
    const classes = styles();
    return (
        <div>
            <Grid>
                <label className={classes.labelStyle}>{i18next.t('LBL_PERSONAL_DATA')}</label>
            </Grid>
            <Grid xs={6}>
                <label>{i18next.t('LBL_INITTYPE')} </label>
                <Field
                    id="customer"
                    name="customer"
                    value={'Sofortkarte Privat Media Markt CLUB'}
                />
                <label>{i18next.t('LBL_LANGUAGE')}</label>
                <Field
                    id="language"
                    name="language"
                    component={TextFieldWrapper}
                    onChange={customerForm.handleChange}
                    error={customerForm.touched.language && Boolean(customerForm.errors.language)}
                    helperText={customerForm.touched.language && customerForm.errors.language}
                />
                <label>{i18next.t('LBL_TITLE')} </label>
                <Field
                    id="salutation"
                    name="salutation"
                    onChange={customerForm.handleChange}
                    component={TextFieldWrapper}
                    error={customerForm.touched.salutation && Boolean(customerForm.errors.salutation)}
                    helperText={customerForm.touched.salutation && customerForm.errors.salutation}
                />
                <label>{i18next.t('LBL_FIRST_NAME')} </label>
                <Field
                    id="firstName"
                    name="firstName"
                    component={TextFieldWrapper}
                    onChange={customerForm.handleChange}
                    error={customerForm.touched.firstName && Boolean(customerForm.errors.firstName)}
                    helperText={customerForm.touched.firstName && customerForm.errors.firstName}
                />
                <label>{i18next.t('LBL_LAST_NAME')} </label>
                <Field
                    id="lastName"
                    name="lastName"
                    onChange={customerForm.handleChange}
                    component={TextFieldWrapper}
                    error={customerForm.touched.lastName && Boolean(customerForm.errors.lastName)}
                    helperText={customerForm.touched.lastName && customerForm.errors.lastName}
                />
                <label>{i18next.t('LBL_DOB')} </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        format="dd/MM/yyyy"
                        onChange={value => customerForm.setFieldValue("birthDate", value)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        error={customerForm.touched.birthDate && Boolean(customerForm.errors.birthDate)}
                        helperText={customerForm.touched.birthDate && customerForm.errors.birthDate}
                    />
                </MuiPickersUtilsProvider>
                <label>{i18next.t('LBL_STATUS')} </label>
                <Field
                    id="civilStatus"
                    name="civilStatus"
                    component={TextFieldWrapper}
                    onChange={customerForm.handleChange}
                />
                <label>{i18next.t('LBL_NATIONALITY')} </label>
                <Field
                    id="nationality"
                    name="nationality"
                    onChange={customerForm.handleChange}
                    component={TextFieldWrapper}
                    error={customerForm.touched.nationality && Boolean(customerForm.errors.nationality)}
                    helperText={customerForm.touched.nationality && customerForm.errors.nationality}
                />
            </Grid>

            <label htmlFor="city">City:</label>
            <Field type="text" name="city"/>
            <ErrorMessage name="city" component="div"/>
            <div>
            </div>
        </div>
    );
};

const StepFour = ({onSubmit, customerForm}) => {
    const classes = styles();
    return (
        <div>
            <label>{i18next.t('LBL_CHECK_COLLECTED_DATA')}</label>
            <Grid container direction="column" style={{paddingTop: '20px'}}>
                <Grid>
                    <Checkbox
                        id="copyId"
                        onChange={customerForm.onChange}
                    />
                    <label>{i18next.t('LBL_COPY_OF_ID')}</label>
                </Grid>
                <Grid>
                    <Checkbox
                        id="checkboxNationality"
                        onChange={customerForm.onChange}
                    />
                    <label>{i18next.t('LBL_NATIONALITY')}</label>
                </Grid>
                <Grid>
                    <Checkbox
                        id="checkboxName"
                        onChange={customerForm.onChange}
                    />
                    <label>{i18next.t('LBL_LAST_NAME_AND_FIRST_NAME')}</label>
                </Grid>
                <Grid>
                    <Checkbox
                        id="checkboxBirth"
                        onChange={customerForm.onChange}
                    />
                    <label>{i18next.t('LBL_DOB')}</label>
                </Grid>
                <Grid>
                    <Checkbox
                        id="checkboxIncome"
                        onChange={customerForm.onChange}
                    />
                    <label>{i18next.t('LBL_INCOME')}</label>
                </Grid>
            </Grid>
        </div>
    );
};

export {StepOne, StepTwo, StepThree, StepFour};
