import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import {useContext} from 'react';
import {find, clone} from 'lodash';


import DashboardStyles from './DashboardStyles';
import {GlobalContext} from '../../context/GlobalState';
import CardCard from './../../assets/images/Club_Card_MM.png';

const permissions = (customerPermision) => {
    const permissionsKey = find(Object.keys(customerPermision), (key) => {
        return key.indexOf('CLUB') >= 0
    });
    const initialPermissions = clone(customerPermision[permissionsKey].permissionChannels);
    return initialPermissions.emailConsentFlag ? 'Yes' : 'No';
}

const Dashboard = (props) => {
    const classes = DashboardStyles();
    const {customerData} = useContext(GlobalContext);
    const customerLable = ['Club card number', 'Club market', 'Newsletter Sign up', 'Member since', 'Mobile no.'];
    const cusomerDetails = [
        customerData.cardCiid[0],
        'MEDIA MARKT ESSEN',
        permissions(customerData.permissions),
        customerData.clubDateOfEntry.split('T')[0],
        customerData.mobile
    ];
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <h3 className={classes.paperHeader}>Customer - Club data</h3>
                <h2 className={classes.customerName}>{`${customerData.salutation} ${customerData.lastName} ${customerData.firstName}`}</h2>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <img className={classes.cardImage} src={CardCard} alt="card"/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {customerLable.map(lable => <h4 key={lable}>{lable}</h4>)}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {cusomerDetails.map(info => <h4 key={info} className={classes.cusomerDetails}>{info}</h4>)}
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3}>
                <h3 className={classes.paperHeader}>Purchases history</h3>
            </Paper>
            <Paper elevation={3}>
                <h3 className={classes.paperHeader}>Coupons</h3>
            </Paper>
        </div>
    )
}

export default Dashboard;