import {makeStyles} from '@material-ui/core/styles';

const RegisterSalesSlipStyles = makeStyles((theme) => ({
    paperHeader: {
        padding: '15px',
        margin: 0,
        backgroundColor: '#DF0000',
        color: '#fff',
        fontWeight: 400,
        marginBottom: '5px'
    },
    paperContent: {
        maxHeight: '80%',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: theme.spacing(41)
    },
    cardImage: {
        height: '100px'
    },
    wrapperCouponInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    couponInfo: {
        margin: 0
    }
}));

export default RegisterSalesSlipStyles;