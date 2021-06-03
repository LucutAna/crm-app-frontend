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
        height: '60px',
        paddingTop: '22px',
        paddingLeft: '15px'
    },
    customerDetails: {
        fontWeight: 400
    },
    detailsGrid: {
        wordBreak: 'break-word'
    }
}));

export default CustomerDataInfoStyles;