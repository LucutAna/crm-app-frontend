import {makeStyles} from '@material-ui/core/styles';

import SuccessClub from './../../assets/images/club.png';

const SuccessPage = (customer) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            paddingTop: theme.spacing(6)
        },
        wrapperCardLogo: {
            display: 'block'
        },
        ciidColor: {
            color: '#DF0000'
        }
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h3>Club Card registration successful </h3>
            <div className={classes.wrapperCardLogo}>
                <img className={classes.log} src={SuccessClub} alt="success"/>
            </div>
            <h3>The Club number is: <span className={classes.ciidColor}> {!!customer.location.state ? customer.location.state.customerRegistration.cardCiid : ''} </span></h3>
        </div>
    )
}

export default SuccessPage;