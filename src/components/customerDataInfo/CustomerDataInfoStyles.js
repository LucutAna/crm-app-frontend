import {makeStyles} from '@material-ui/core/styles';

const CustomerDataInfoStyles = makeStyles((theme) => ({
    paperHeader: {
        padding: '15px',
        margin: 0,
        backgroundColor: '#DF0000',
        color: '#fff',
        fontWeight: 400
    },
    customerName: {
        paddingLeft: '15px'
    },
    cardImage: {
        height: '80px',
        paddingTop: '22px',
        paddingLeft: '15px'
    },
    customerDetails: {
        fontWeight: 400
    }
}));

export default CustomerDataInfoStyles;