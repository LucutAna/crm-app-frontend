import React, {useContext, useEffect, useState} from 'react';
import CustomerDataStep from "./CustomerDataStep";
import {GlobalContext} from "../../context/GlobalState";
import CardDetailsStep from "./CardDetailsStep";
import ChecklistStep from "./ChecklistStep";
import SuccessPage from "./SuccessPage";
import CustomerService from "../../shared/services/CustomerService";
import SummaryStep from "./SummaryStep";

const steps = [
    {component: <CustomerDataStep/>},
    {component:<CardDetailsStep/>},
    {component:<ChecklistStep/>},
    {component:<SummaryStep/>}
]


const ShoppingCard = (props) => {

    return(
        <div>
            {/*<CustomerDataStep/>*/}
            <CardDetailsStep/>
            <ChecklistStep/>
            <SummaryStep/>
        </div>

    )
}

export default ShoppingCard;
