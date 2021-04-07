import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CardCard from './../../assets/images/Club_Card_MM.png';
import CustomerDataInfoStyles from './CustomerDataInfoStyles';

const CustomerDataInfo = ({customer}) => {
    const classes = CustomerDataInfoStyles();
    const customerLable = ['Club card number', 'Club market', 'Newsletter Sign up', 'Member since', 'Mobile no.'];

    return (
        <>
            <Paper elevation={3}>
                <h3 className={classes.paperHeader}>Customer - Club data</h3>
                <h2 className={classes.customerName}>{`${customer.salutation} ${customer.lastName} ${customer.firstName}`}</h2>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <img className={classes.cardImage} src={CardCard} alt="card"/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {customerLable.map(lable => <h4 key={lable}>{lable}</h4>)}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <h4 className={classes.cusomerDetails}>{customer.ciid}</h4>
                        <h4 className={classes.cusomerDetails}>{customer.preferredOutlet}</h4>
                        <h4 className={classes.cusomerDetails}>{customer.consent}</h4>
                        <h4 className={classes.cusomerDetails}>{customer.activationDate}</h4>
                        <h4 className={classes.cusomerDetails}>{customer.phoneNumber}</h4>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default CustomerDataInfo;