import Paper from '@material-ui/core/Paper';
import {useContext, useState, useEffect} from 'react';
import moment from 'moment';
import {find, clone, isEmpty} from 'lodash';


import DashboardStyles from './DashboardStyles';
import {GlobalContext} from '../../context/GlobalState';
import ConfigService from './../../shared/services/ConfigService';
import CustomerDataInfo from './../../components/customerDataInfo/CustomerDataInfo'

const permissions = (customerPermision) => {
    const permissionsKey = find(Object.keys(customerPermision), (key) => {
        return key.indexOf('CLUB') >= 0
    });
    const initialPermissions = clone(customerPermision[permissionsKey].permissionChannels);
    return initialPermissions.emailConsentFlag ? 'Yes' : 'No';
}

const Dashboard = ({configData}) => {
    const classes = DashboardStyles();
    const {customerData} = useContext(GlobalContext);
    const [customerInfo, setCustomerInfo] = useState('');

    useEffect(() => {
        if (!isEmpty(customerData)) {
            try {
                const getPreferredOutletName = async () => {
                    const preferredOutletName = await ConfigService.getStore(customerData.preferredOutlet);
                    const customer = {
                        ciid: customerData.cardCiid[0],
                        preferredOutlet: preferredOutletName.data.storeName,
                        consent: permissions(customerData.permissions),
                        activationDate: moment(customerData.clubDateOfEntry).format(configData.modules.DATE_FORMAT.toUpperCase()),
                        phoneNumber: customerData.mobile,
                        firstName: customerData.firstName,
                        lastName: customerData.lastName,
                        salutation: customerData.salutation
                    }
                    setCustomerInfo(customer)
                }
                getPreferredOutletName();
            } catch (error) {
                console.log(error);
            }
        }
    }, [customerData, configData])

    return (
        <div className={classes.root}>
            {!isEmpty(customerData) ?
                <>
                    <CustomerDataInfo customer={customerInfo}/>
                    <Paper elevation={3}>
                        <h3 className={classes.paperHeader}>Purchases history</h3>
                    </Paper>
                    <Paper elevation={3}>
                        <h3 className={classes.paperHeader}>Coupons</h3>
                    </Paper>
                </> : null}
        </div>
    )
}

export default Dashboard;