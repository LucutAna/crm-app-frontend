import React, {useContext, useEffect, useState} from 'react';
import CustomerDataStep from "./CustomerDataStep";
import CardDetailsStep from "./CardDetailsStep";
import ChecklistStep from "./ChecklistStep";
import SummaryStep from "./SummaryStep";
import InstantCard from "./InstantCard";
import NoInstantCard from "./NoInstantCard";
import SuccessPage from './SuccessPage';

const steps = [
    {component: <CustomerDataStep/>},
    {component:<CardDetailsStep/>},
    {component:<ChecklistStep/>},
    {component:<SummaryStep/>}
]


const ShoppingCardFirstTry = (props) => {

    return(
        <div>
            {/*<CustomerDataStep/>*/}
            <CardDetailsStep/>
            <ChecklistStep/>
            <SummaryStep/>
            <InstantCard/>
            <NoInstantCard/>
            {/*<SuccessPage/>*/}
        </div>

    )
}

export default ShoppingCardFirstTry;
