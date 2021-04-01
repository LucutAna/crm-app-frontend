import {makeStyles} from '@material-ui/core/styles';

import SuccessClub from './../../assets/images/club.png';

const SuccessPage = (customer) => {
    const updateFlag = !customer.location.state.customerRegistrationData.updateCustomerFlag;
    const ciid = customer.location.state.customerRegistrationData.cardCiid;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            paddingTop: theme.spacing(6)
        },
        wrapperCardLogo: {
            display: 'block',
            paddingRight: '80px'
        },
        ciidColor: {
            color: '#DF0000'
        }
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {updateFlag ? <h3>Club Card registration successful</h3> : <h3>Club Card was successfully updated</h3>}
            <div className={classes.wrapperCardLogo}>
                <img className={classes.log} src={SuccessClub} alt="success"/>
            </div>
            {updateFlag ? <h3 className={classes.ciidColor}>{ciid}</h3> : ''}
        </div>
    )
}

export default SuccessPage;