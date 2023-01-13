import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {isEmpty} from 'lodash';

import CardCard from './../../assets/images/Club_Card_MM.png';
import CustomerDataInfoStyles from './CustomerDataInfoStyles';
import Spinner from '../spinners/customSpinner/CustomSpinner';
import i18next from "i18next";

const CustomerDataInfo = ({customer}) => {
    const classes = CustomerDataInfoStyles();
    const customerLable = [`${i18next.t('LBL_LOYALTY_CARD_NUMBER')}`,
        `${i18next.t('LBL_PREFERRED_OUTLET_INFORMATION')}`,
        `${i18next.t('LBL_ADVERTISING_CONSENT')}`,
        `${i18next.t('LBL_MEMBER_SINCE')}`,
        `${i18next.t('LBL_TEL_MOBILE_NO_PERMISSION')}`];
    return (
        <Paper elevation={3}>
            <h4 className={classes.paperHeader}>{i18next.t('LBL_CUSTOMER_DATA_PANEL')}</h4>
            {!isEmpty(customer) ?
                <div className={classes.container}>
                    <h2 className={classes.customerName}>{`${customer.salutation} ${customer.lastName} ${customer.firstName}`}</h2>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <img className={classes.cardImage} src={CardCard} alt="card"/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {customerLable.map(lable => <h5 key={lable}>{lable}</h5>)}
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.detailsGrid}>
                            <h5 className={classes.customerDetails}>{customer.ciid}</h5>
                            <h5 className={classes.customerDetails}>{customer.preferredOutlet}</h5>
                            <h5 className={classes.customerDetails}>{customer.consent}</h5>
                            <h5 className={classes.customerDetails}>{customer.activationDate}</h5>
                            <h5 className={classes.customerDetails}>{customer.phoneNumber}</h5>
                        </Grid>
                    </Grid>
                </div> : <Spinner openSpinner={true}/>
            }
        </Paper>
    )
}

export default CustomerDataInfo;
