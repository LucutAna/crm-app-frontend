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
        height: theme.spacing(60)
    },
    salesSlipImage: {
        height: '300px',
        paddingTop:'7%'
    },
    gridContent: {
        textAlign: 'center'
    }
}));

export default RegisterSalesSlipStyles;