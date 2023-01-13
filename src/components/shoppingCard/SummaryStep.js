import ShoppingCardStyle from "./ShoppingCardStyle";
import {Card, CardContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Field, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import React, {useContext} from "react";
import i18next from "i18next";
import {GlobalContext} from "../../context/GlobalState";

const SummaryStep = () => {
    const classes = ShoppingCardStyle();

    const {customerData} = useContext(GlobalContext);

    return(
        <div>
            <Card>
                <CardContent>
                    <Formik initialValues={{
                        language: customerData.language,
                        salutation: customerData.salutation,
                        firstName: customerData.firstName,
                        lastName: customerData.lastName,
                        birthDate: customerData.birthDate,
                        civilStatus:'',
                        nationality:''
                    }} onSubmit={() => {}}>
                    <Form>
                        <Grid container spacing={4}>
                            <label className={classes.labelStyle}>{i18next.t('LBL_PERSONAL_DATA')}</label>
                        </Grid>
                        <Grid container spacing={2} style={{display:"flex", flexDirection:"column"}}>
                            <Grid item xs={3} sm={4}>
                                <Field name="Language"
                                       component={TextField}
                                       label="Language"
                                       value={customerData.language}
                                />
                                <Field name="Salutation"
                                       component={TextField}
                                       label="Salutation"
                                       value={customerData.salutation}
                                />
                                <Field name="firstName"
                                       component={TextField}
                                       label="First name"
                                       value={customerData.firstName}
                                />
                                <Field name="lastName"
                                       component={TextField}
                                       label="Last name"
                                       value={customerData.lastName}
                                />
                                <Field name="birthDate"
                                       component={TextField}
                                       label="Birth date"
                                       value={customerData.birthDate}
                                />
                                <Field name="civil"
                                       component={TextField}
                                       label="Civil status"
                                       value={customerData.civilStatus}
                                />
                                <Field name="nationality"
                                       component={TextField}
                                       label="Nationality"
                                       value={customerData.nationality}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <label className={classes.labelStyle} style={{paddingTop:'20px'}}>Contact informations</label>
                        </Grid>
                        <Grid container spacing={2} style={{display:"flex", flexDirection:"column"}}>
                            <Grid item xs={3} sm={4}>
                                <Field name="email"
                                       component={TextField}
                                       label="Email"
                                       value={customerData.email}
                                />
                                <Field name="mobile"
                                       component={TextField}
                                       label="Mobile number"
                                       value={customerData.mobile}
                                />
                                <Field name="privateNumber"
                                       component={TextField}
                                       label="Private phone number"
                                />
                                <Field name="businessNumber"
                                       component={TextField}
                                       label="Business number"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <label className={classes.labelStyle} style={{paddingTop:'20px'}}>Actual address</label>
                        </Grid>
                        <Grid container spacing={2} style={{display:"flex", flexDirection:"column"}}>
                            <Grid item xs={3} sm={4}>
                                <Field name="street"
                                       component={TextField}
                                       label="Street and Number"
                                       value={customerData.street1}
                                />
                                <Field name="zipcode"
                                       component={TextField}
                                       label="ZIP code"
                                       type="text"
                                       value={customerData.zipcode}
                                />
                                <Field name="city"
                                       component={TextField}
                                       label="City"
                                       type="text"
                                       value={customerData.city}
                                />
                                <Field name="country"
                                       component={TextField}
                                       label="Country"
                                       value={customerData.country}
                                />
                                <Field name="residentSince"
                                       component={TextField}
                                       label="Resident since"
                                />
                            </Grid>
                        </Grid>
                    </Form>
                    </Formik>
                </CardContent>
            </Card>
        </div>
        )
}

export default SummaryStep;
