import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalState";
import Button from "@material-ui/core/Button";
import CustomerService from "../../shared/services/CustomerService";
import ChannelPermissionsPageStyle from "./ChannelPermissionsPageStyle";
import {ListItem, ListItemText} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import i18next from "i18next";

const ChannelPermissionsPage = (props) =>{
    const classes = ChannelPermissionsPageStyle();
    const {customerData, ...rest} = useContext(GlobalContext);
    const [checkboxSelected,setCheckboxSelected] = useState(false);
    const [errorInvalidEmail, setErrorInvalidEmail] = useState('');
    const [succesMessage, setSuccesMessage] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [email, setEmail] = useState(customerData.email)

    const validEmail = (email) =>{
        const emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        const validate =  emailPattern.test(email);
        return validate;
    }
    const saveHandler = async () => {
        const emailIsValid = validEmail(email);
        const {configData} = props;
        if (emailIsValid) {
            const data ={
                ...customerData,
                customerConsentFlag: true,
                salesDivision: configData.salesDivision,
                subsidiary: configData.subsidiary
            }
            const dataToBeSaved = CustomerService.createCustomerUpsertData(customerData, props.configData,data)
            await CustomerService.upsertCustomer(dataToBeSaved)
            setSuccesMessage("Email is valid.You've been successfully subscribed!")
            setErrorInvalidEmail('');
        }
        else{
            setErrorInvalidEmail("Email is not valid! Please enter a valid one!")
            setIsDisable(false);
        }
    }
    const checkbSelected = (e) =>{
        if(e.target.value){
            setCheckboxSelected(true);
        }
        else{
            setCheckboxSelected(false);
        }
    }

    return(
        <>
            <div className={classes.firstText}>{i18next.t('TXT_PERMISSION_CHANNELS_INFO')}</div>
            <div className={classes.secondText}>{i18next.t('TXT_PERMISSION_CHANNELS_CHANGES')}</div>
            <div>
                <label className={classes.emailText}>{i18next.t('LBL_EMAIL')}</label>
                <input type="text"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       disabled={isDisable}
                />
                <input type="checkbox"
                       disabled={false}
                       onClick={checkbSelected}
                />
            </div>
            <div>
                <Button className={classes.saveButton} variant="contained" color="primary" disabled={!checkboxSelected} onClick={saveHandler}>{i18next.t('BTN_SAVE_CHANGES')}</Button>
            </div>
            <div className={classes.saveMessages}>{i18next.t('LBL_YES')}</div>
            <div className={classes.saveMessages}>{i18next.t('ERR_INVALID_EMAIL')}</div>
            <div className={classes.thirdText}>
                <ListItem> {i18next.t('TEXT_PERMISSIONS_CHANNELS_DEREGISTER')} </ListItem>
                <ListItem>• Abmeldung im Newsletter über den Button "Newsletter abmelden"</ListItem>
                <ListItem>• E-Mail an: kontakt@mediamarkt.club</ListItem>
                <ListItem>• Hotline: 0800 / 72 430 40</ListItem>
            </div>
        </>
    );
}

export default ChannelPermissionsPage;
