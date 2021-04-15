import {makeStyles} from '@material-ui/core/styles';

const HistoryPurchasesStyles = makeStyles((theme) => ({
    container: {
        height: theme.spacing(43),
    },
    paperHeader: {
        padding: '15px',
        margin: 0,
        backgroundColor: '#DF0000',
        color: '#fff',
        fontWeight: 400
    }
}));

export default HistoryPurchasesStyles;