import {makeStyles} from '@material-ui/core/styles';

const CustomerFormStyles = makeStyles((theme) => ({
    country: {
        marginTop: theme.spacing(4),
        marginRight: theme.spacing(2)
    },
    birthDate: {
        marginTop: theme.spacing(4),
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    gender: {
        flexDirection: 'row',
    },
    btnRegistration: {
        marginTop: theme.spacing(2),
    },
    inputText: {
        marginTop: theme.spacing(2)
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    wrapperButtons: {
        paddingTop: '60px !important'
    },
    buttons: {
        marginTop: 20
    }
}));

export default CustomerFormStyles; 