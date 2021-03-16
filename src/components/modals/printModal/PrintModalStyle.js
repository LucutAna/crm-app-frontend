import {makeStyles} from '@material-ui/core/styles';

const PrintModalStyles = makeStyles((theme) => ({
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
    buttonWrapper: {
        justifyContent: 'space-around',
    }
}));

export default PrintModalStyles;