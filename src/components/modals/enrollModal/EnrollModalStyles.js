import {makeStyles} from '@material-ui/core/styles';

const EnrollModalStyles = makeStyles((theme) => ({
    root: {},
    buttonRegistration: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    buttonGenerate: {
        marginBottom: theme.spacing(2)
    },
    infoText: {
        fontSize: 14,
        paddingBottom: theme.spacing(1)
    },
    divider: {
        textAlign: 'center',
        paddingBottom: theme.spacing(3),
        fontWeight: 700
    }
}));

export default EnrollModalStyles;