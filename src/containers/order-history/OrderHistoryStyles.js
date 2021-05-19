import {makeStyles} from "@material-ui/core/styles";

const OrderHistoryStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    filterTab: {
        marginBottom: '35px',
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
        display: 'block'
    },
    accordionDetails: {
        padding: '20px 0'
    },
    orderDetails: {
        paddingLeft: '4%',
        flexBasis: '50%'
    },
    productDetails: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        paddingLeft: '15px'
    },
    btnWrapper: {
        padding: ' 15px 30px 15px 0',
        textAlign: 'end'
    }
}));

export default OrderHistoryStyles;