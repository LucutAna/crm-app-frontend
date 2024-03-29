import {makeStyles} from '@material-ui/core/styles';

const ReplacementCardStyles = makeStyles((theme) => ({
    paperHeader: {
        padding: '15px',
        margin: 0,
        backgroundColor: '#DF0000',
        color: '#fff',
        fontWeight: 400,
        marginBottom: '5px'
    },
    paperContent: {
        maxHeight: '80%',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: theme.spacing(41),
        marginLeft:10,
        marginRight:10,

    },
    couponsContainer: {
        paddingBottom: '4px',
    },
    cardImage: {
        height: '100px'
    },
    wrapperCouponInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    couponInfo: {
        margin: 0
    },
    inputText: {
        marginTop: theme.spacing(1),
        '& div.MuiInputBase-root': {
            '&:not(.Mui-error)': {
                marginBottom: '23px'
            },
        }
    },
    addReplacementCardButton: {
        marginTop: theme.spacing(-1),
    },
    paper: {
        padding: theme.spacing(1),
        fontWeight: "bold",
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default ReplacementCardStyles;
