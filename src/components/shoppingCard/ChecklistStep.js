import ShoppingCardStyle from "./ShoppingCardStyle";
import {Card, CardContent, Checkbox} from "@material-ui/core";
import {Form, Formik} from "formik";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import {date} from "yup";
import Button from "@material-ui/core/Button";
import i18next from "i18next";

const ChecklistStep = () => {
    const classes = ShoppingCardStyle();
    const [checkboxes, setChecked] = useState([]);

    const checkboxStatus = [{ name: 'checkboxCopyId', value: 1, checked:false},
                            { name: 'checkboxNationality', value: 2, checked:false},
                            { name: 'checkboxName', value: 3, checked:false},
                            { name: 'checkboxBirthdate', value: 4, checked:false},
                            { name: 'checkboxIncome', value: 5, checked:false}];

    const checkChanged = (state) => {
        console.log("checked")
        setChecked(checkboxStatus.value);
      //  console.log(checkboxes)
    }

    return(
        <div>
            <Card>
                <CardContent>
                    <Formik
                        initialValues={{
                            copyId: false,
                            nationality: '',
                            firstName:'',
                            lastName: '',
                            birthDate: date,
                            income: ''
                        }}
                    >
                        <Form>
                            <Grid container spacing={4}>
                                <Grid style={{paddingLeft:"27px", paddingBottom:'20px'}}>
                                    <label>{i18next.t('LBL_CHECK_COLLECTED_DATA')}</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} >
                                <Grid className={classes.checklist}>
                                    <Checkbox onChange={checkChanged}/>
                                    <label>{i18next.t('LBL_COPY_OF_ID')}:</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} >
                                <Grid  className={classes.checklist}>
                                    <Checkbox />
                                    <label >{i18next.t('LBL_NATIONALITY')}:</label>
                                    <label> CH</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist} >
                                    <Checkbox />
                                    <label>{i18next.t('LBL_LAST_NAME_AND_FIRST_NAME')}:</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist}>
                                    <Checkbox/>
                                    <label>{i18next.t('LBL_DOB')}:</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid className={classes.checklist}>
                                    <Checkbox />
                                    <label>{i18next.t('LBL_INCOME')}:</label>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                    <div >
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                        >{i18next.t('BTN_SEND_REQUEST')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ChecklistStep;
