import {makeStyles} from '@material-ui/core/styles';

const ClubAccountPageStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 700
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    descriptionContainer: {
        maxWidth: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&:hover' :{
            cursor:'pointer'
        }
    },
    highlight: {
        color: theme.palette.secondary.main,
    },
    title: {
        flex: '1 1 100%',
    },
    headersTable: {
        fontWeight: 700
    }
}));

export default ClubAccountPageStyle;
