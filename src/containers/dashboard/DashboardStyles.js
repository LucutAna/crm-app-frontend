import {makeStyles} from '@material-ui/core/styles';

const DashboardStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '5%',
        '& > *': {
            margin: theme.spacing(1),
            width: '35%',
            height: theme.spacing(50),
            alignItems: 'center',
        },
    },
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
    cusomerDetails: {
        fontWeight: 400
    }

}));

export default DashboardStyles;