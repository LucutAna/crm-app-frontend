import React from 'react';
import {Form, Field, Formik} from "formik";
import {Card, CardContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ShoppingCardStyle from "./ShoppingCardStyle";
import i18next from "i18next";

const CardDetailsStep = () => {
    const classes = ShoppingCardStyle();

    return(
        <div>
            <Card>
                <CardContent>
                    <Formik
                        initialValues={{
                            imprintName: '',
                            // saldoGarant: false,
                            employeeName: '',
                            staffNumber: 0,
                            // unknown: false
                        }} onSubmit={ () => {}}
                    >
                        <Form>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={4}>
                                    <Field className={classes.cardDetailsFields}
                                           name="imprintName"
                                           component={TextField}
                                           label={i18next.t('LBL_IMPRINT_NAME')}/>
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
                            <Grid container spacing={0} >
                                <Grid container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                >
                                    <Field className={classes.cardDetailsFields}
                                           name="employeeName"
                                           component={TextField}
                                           label={i18next.t('LBL_EMPLOYEE_NAME')}/>
                                    <Field className={classes.cardDetailsFields}
                                           name="staffNumber" type="number"
                                           component={TextField}
                                           label={i18next.t('LBL_STAFF_NUMBER')}/>
                                    <label className={classes.checkboxCardDetails}>
                                        <Field  type="checkbox"
                                                name="unknown" value="Unknown"/>
                                        {i18next.t('LBL_UNKNOWN')}
                                    </label>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                    <div className={classes.buttonsCardDetails}>
                        <Button
                                        variant="contained"
                                        color="primary"
                                    >
                            {i18next.t('BTN_BACK_TO_CUSTOMER_DATA')}
                                    </Button>
                        <Button
                                        variant="contained"
                                        color="primary"
                                    >
                            {i18next.t('BTN_GO_TO_SUMMARY')}
                                    </Button>
                    </div>
                    {/*<div style={{marginTop:'30px'}}>*/}
                    {/*    <Grid container spacing={8}>*/}
                    {/*        <Grid item xs={3} sm={4}>*/}
                    {/*            <Button*/}
                    {/*                variant="contained"*/}
                    {/*                color="primary"*/}
                    {/*            >*/}
                    {/*                Go back*/}
                    {/*            </Button>*/}
                    {/*        </Grid>*/}
                    {/*        <Grid item xs={3} sm={4}>*/}
                    {/*            <Button*/}
                    {/*                variant="contained"*/}
                    {/*                color="primary"*/}
                    {/*            >*/}
                    {/*                Go to summary*/}
                    {/*            </Button>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</div>*/}
                </CardContent>
            </Card>
        </div>
    )
}

export default CardDetailsStep;
