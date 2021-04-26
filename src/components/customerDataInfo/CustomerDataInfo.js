import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {isEmpty} from 'lodash';

import CardCard from './../../assets/images/Club_Card_MM.png';
import CustomerDataInfoStyles from './CustomerDataInfoStyles';
import Spinner from '../spinners/customSpinner/CustomSpinner';

const CustomerDataInfo = ({customer}) => {
    const classes = CustomerDataInfoStyles();
    const customerLable = ['Club card number', 'Club market', 'Newsletter Sign up', 'Member since', 'Mobile no.'];
    return (
        <Paper elevation={3}>
            <h4 className={classes.paperHeader}>Customer - Club data</h4>
            {!isEmpty(customer) ?
                <span>
                        <h2 className={classes.customerName}>{`${customer.salutation} ${customer.lastName} ${customer.firstName}`}</h2>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <img className={classes.cardImage} src={CardCard} alt="card"/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {customerLable.map(lable => <h5 key={lable}>{lable}</h5>)}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h5 className={classes.customerDetails}>{customer.ciid}</h5>
                                <h5 className={classes.customerDetails}>{customer.preferredOutlet}</h5>
                                <h5 className={classes.customerDetails}>{customer.consent}</h5>
                                <h5 className={classes.customerDetails}>{customer.activationDate}</h5>
                                <h5 className={classes.customerDetails}>{customer.phoneNumber}</h5>
                            </Grid>
                        </Grid> 
                    </span> : <Spinner openSpinner={true}/>
            }
        </Paper>
    )
}

export default CustomerDataInfo;