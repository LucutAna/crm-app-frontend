import {makeStyles} from '@material-ui/core/styles';

const CustomerFormStyles = makeStyles((theme) => ({
    country: {
        marginRight: theme.spacing(2)
    },
    birthDate: {
        marginTop: 0,
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
        '& div.MuiInputBase-root': {
            '&:not(.Mui-error)': {
                marginBottom: '23px'
            },
        }
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
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

export default CustomerFormStyles; 