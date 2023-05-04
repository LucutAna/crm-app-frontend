import React, {useState} from 'react';
import CustomerDataStep from "./CustomerDataStep";
import InstantCard from "./InstantCard";
import NoInstantCard from "./NoInstantCard";
import SuccessPage from './SuccessPage';
// const steps = [
//     {component: <CustomerDataStep/>}
// ]


const ShoppingCard = (props) => {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        });

    const nextStep = () => {
        setStep(step + 1);
    }

    const previousStep = () => {
        setStep(step - 1);
    }


    const handleInputData = input => e => {
        const {value} = e.target;
        setFormData(prevState => ({
                ...prevState,
                [input]: value,
            }))
    }
    console.log('formData', formData);

    return(
        <div>

            {/*<CustomerDataStep/>*/}
            {/*<InstantCard/>*/}
            {/*<NoInstantCard/>*/}
            {/*<SuccessPage/>*/}
        </div>
    )
}

export default ShoppingCard;
