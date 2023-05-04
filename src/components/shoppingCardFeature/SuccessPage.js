import React, {useState} from 'react';
import i18next from "i18next";
import ShoppingCardStyle from "./ShoppingCardStyle";
import { Loading } from 'react-loading-dot';

const SuccessPage = () =>{

    return(
        <div>
            <h3>{i18next.t('LBL_SUCCESS_SENDING_REQUEST')}</h3>
            <div>
                <Loading/>
            </div>
            <p>{i18next.t('LBL_TWO_MINUTES')}</p>
        </div>
    )
}

export default SuccessPage;
