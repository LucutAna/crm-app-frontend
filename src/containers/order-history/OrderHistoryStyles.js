import {makeStyles} from "@material-ui/core/styles";

const OrderHistoryStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordionContainer: {
        marginBottom: '15px',
        transitionDuration: '0.15',
        transitionTimingFunction: 'ease-in-out',
        transitionProperty: 'box-shadow',

        '&:hover': {
            'boxShadow': '0 0 3px #DF0000',
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '20%',
        color: theme.palette.text.secondary
    },
    transactionImage: {
        display: 'block',
        paddingRight: '10px'
    },
    transactionDate: {
        display: 'block',
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        paddingLeft: '15px'
    },
    transactionDetails: {
        display:'block'
    }
}));

export default OrderHistoryStyles;