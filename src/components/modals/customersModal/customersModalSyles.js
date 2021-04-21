import {makeStyles} from '@material-ui/core/styles';

const CustomersModalStyles = makeStyles((theme) => ({
    root: {},
    infoText: {
        fontSize: 14,
        paddingBottom: theme.spacing(1)
    },
    divider: {
        textAlign: 'center',
        paddingBottom: theme.spacing(3),
        fontWeight: 700
    },
    dialogHeaders: {
        backgroundColor: '#DF0000',
        color: '#fff'
    },
    paper: {
      marginBottom: '5px',
        '&:hover' : {
          cursor: 'pointer'
        }
    },
    gridContainer: {
        padding: '30px 20px'
    },
    wrapperName: {
        paddingBottom: '10px',
        textTransform: 'capitalize'
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    cardImage: {
        height: '30px'
    },
    wrapperPhone: {
        textAlign: 'right',
    }
}));

export default CustomersModalStyles;