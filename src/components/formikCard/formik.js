import React, {useState, useContext} from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {Stepper, Step, StepLabel, Button} from "@material-ui/core";
import {StepOne, StepTwo, StepThree, StepFour} from "./Steps";
import {GlobalContext} from "../../context/GlobalState";

const MultiStepForm = (configData) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({});
    const steps = ["Customer Data", "Card details and further more", "Summary", "Checklist"];
    const {customerData} = useContext(GlobalContext);

    const initialValues = {
        salutation: customerData.salutation || '',
        language: customerData.language || '',
        firstName: customerData.firstName || '',
        lastName: customerData.lastName || '',
        birthDate: customerData.birthDate || '',
        civilStatus: '',
        nationality: customerData.country || '',
        mobile: customerData.mobile || '',
    };

    const validationSchema = Yup.object({
        customerData: Yup.object().shape({
            salutation: Yup.string().required('Salutation is required'),
            firstName: Yup.string()
                .min(3, "First name must be at least 3 characters")
                .required("First name is required"),
            lastName: Yup.string().required('Last name is required'),
            birthDate: Yup.string(),
            civilStatus: Yup.string().required('Civil status is required'),
            nationality: Yup.string().required('Nationality is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            mobile: Yup.number(),
        }),
    });

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

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <StepOne setActiveStep={setActiveStep} activeStep={activeStep} configData={configData}
                                validationSchema={validationSchema}/>;
            case 1:
                return <StepTwo setActiveStep={setActiveStep} activeStep={activeStep}/>;
            case 2:
                return <StepThree setActiveStep={setActiveStep} activeStep={activeStep}/>;
            case 3:
                return <StepFour setActiveStep={setActiveStep} activeStep={activeStep}/>;
        }
    };

    const handleStepClick = (stepIndex) => {
        setActiveStep(stepIndex);
    };

    return (
        <Formik
             initialValues={initialValues}
             //validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <Stepper activeStep={activeStep} style={{paddingLeft: '0px'}}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel onClick={() => handleStepClick(index)}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep)}
                {activeStep > 0 ? <Button onClick={() => setActiveStep(s => s - 1)}>Back</Button> : null}
                <Button type="submit">{isLastStep() ? 'Submit' : 'Next'}</Button>
            </Form>
        </Formik>
    );
};

export default MultiStepForm;
