import React, {useState, useContext} from "react";
import {Formik, Form, Field} from "formik";
import {Stepper, Step, StepLabel, Button, TextField} from "@material-ui/core";
import {StepOne, StepTwo, StepThree, StepFour} from "./Steps";
import {GlobalContext} from "../../context/GlobalState";

const MultiStepForm = (configData) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({});
    const steps = ["Customer Data", "Card details and further more", "Summary", "Checklist"];
    const {customerData} = useContext(GlobalContext);

    const initialValues = {
        salutation: customerData.salutation,
        language: customerData.language,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        birthDate: customerData.birthDate,
        civilStatus: '',
        nationality: customerData.country,
        mobile: customerData.mobile || '',
        email: customerData.email,
    };

    // const validationSchema = () => {
    //     console.log('validationSchema')
    //     const data = Yup.object().shape({
    //            // salutation: Yup.boolean().required('Salutation is required'),
    //             firstName: Yup.string()
    //                 .min(3, "First name must be at least 3 characters")
    //                 .required("First name is required"),
    //             lastName: Yup.string().required('Last name is required'),
    //           //  birthDate: Yup.string(),
    //             civilStatus: Yup.string().required('Civil status is required'),
    //             nationality: Yup.string().required('Nationality is required'),
    //             email: Yup.string().email('Invalid email format').required('Email is required'),
    //             mobile: Yup.string(),
    //     });
    //     console.log('data', data);
    //     return data;
    // }

    const validate = (values) => {
        const errors = {};

        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.civilStatus) {
            errors.civilStatus = 'Required';
        }
        if (!values.mobile) {
            errors.mobile = 'Required';
        }
        // if (!values.street1) {
        //   errors.street1 = 'Required';
        // }
        // if (!values.street) {
        //   errors.street = 'Required';
        // }
        // if (!values.city) {
        //   errors.city = 'Required';
        // }
        // if (!values.zipcode) {
        //   errors.zipcode = 'Required';
        // }
        // if (!values.zipcode1) {
        //   errors.zipcode1 = 'Required';
        // }
        // if (!values.city1) {
        //   errors.city1 = 'Required';
        // }
        // if (!values.imprintName) {
        //   errors.imprintName = 'Required';
//}
        console.log('values', values)
        return errors;
    }

    const isLastStep = () => {
        return activeStep === steps.length - 1;
    }

    const handleSubmit = async (values) => {
        if (isLastStep()) {
            await setFormValues(values);
        } else {
            setActiveStep(step => step + 1);
        }
    };

    console.log('formValues object:', formValues);

    const getStepContent = (step, customerForm) => {
        console.log("customerForm", customerForm)
        switch (step) {
            case 0:
                return <StepOne
                    setActiveStep={setActiveStep}
                    customerForm={customerForm}
                    activeStep={activeStep}
                    configData={configData}
                />
            case 1:
                return <StepTwo setActiveStep={setActiveStep}
                                activeStep={activeStep}
                                customerForm={customerForm}/>;
            case 2:
                return <StepThree setActiveStep={setActiveStep}
                                  activeStep={activeStep}
                                  customerForm={customerForm}/>;
            case 3:
                return <StepFour setActiveStep={setActiveStep}
                                 activeStep={activeStep}
                                 customerForm={customerForm}/>;
        }
    };

    const handleStepClick = (stepIndex) => {
        setActiveStep(stepIndex);
    };

    // console.log('initialValues', JSON.stringify(initialValues));

    return (
        <Formik
            validateOnMount={true}
            enableReinitialize={true}
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            children={(customerForm) =>
                <Form>
                    <Stepper activeStep={activeStep} style={{paddingLeft: '0px'}}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel onClick={() => handleStepClick(index)}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {getStepContent(activeStep, customerForm)}
                    {activeStep > 0 ? <Button variant="contained" onClick={() => setActiveStep(s => s - 1)}>Back</Button> : null}
                    <Button color="primary" variant="contained" type="submit">{isLastStep() ? 'Submit' : 'Next'}</Button>
                </Form>}
        >
        </Formik>
    );
};

export default MultiStepForm;
