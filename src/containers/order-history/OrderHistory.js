import Accordion from '@material-ui/core/Accordion';
import {useEffect, useState} from "react";
import moment from "moment";
import {isEmpty, uniq, forEach} from 'lodash';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderHistoryStyles from "./OrderHistoryStyles";
import StoreIconMM from "../../assets/images/paperless_life_store.png";
import OnlineIconMM from "../../assets/images/paperless_life_online.png";

const printDocumentNumbers = (documentNumber) => {
    if (isEmpty(documentNumber)) {
        return '';
    }
    let documentNumbers = uniq(documentNumber);
    if (documentNumbers.length === 1) {
        return documentNumbers[0];
    } else {
        let stringDocumentNumbers = '';
        forEach(documentNumbers, function (docNo) {
            stringDocumentNumbers += docNo + ', ';
        });
        return stringDocumentNumbers.slice(0, -2);
    }
}

const OrderHistory = ({transactionsHistory, configData}) => {
    const [transactions, setTransactions] = useState([]);
    const classes = OrderHistoryStyles();
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setTransactions(transactionsHistory);
    }, [transactionsHistory]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const showDocumentNumbers = (transaction) => {
        if (transaction.type === 'online') {
            return true;
        }
        let documentNumbers = [];
        forEach(transaction.orderDetails, function (order) {
            order.salesDocNo && documentNumbers.push(order.salesDocNo);
        });
        return printDocumentNumbers(documentNumbers);
    }

    const showDocumentNumbersOnline = (transaction) => {
        if (transaction.type === 'online') {
            return true;
        }
        let documentNumbersOnline = [];
        forEach(transaction.orderDetails, function (order) {
            order.onlineSalesDocNo && documentNumbersOnline.push(order.onlineSalesDocNo);
        });
        return printDocumentNumbers(documentNumbersOnline);
    };

    return (
        <div className={classes.root}>
            {
                transactions.length > 0 ? transactions.map(
                    (transaction, index) => <Accordion className={classes.accordionContainer}
                                                       key={transaction.orderNumber} expanded={expanded === index}
                                                       onChange={handleChange(index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <img className={classes.transactionImage}
                                 src={transaction.type === 'store' ? StoreIconMM : OnlineIconMM} height="20"
                                 alt="logo-transaction"/>
                            <Typography className={classes.heading}>
                                {transaction.storeName} ({transaction.storeSapId})
                                <span
                                    className={classes.transactionDate}>Transaction date: {moment(transaction.date).format(configData.modules.DATE_FORMAT.toUpperCase())}</span>
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                <span
                                    className={classes.transactionDetails}>{transaction.type === "online" ? 'Order Number' : 'Bon'} : {transaction.orderNumber}</span>
                                {transaction.type === "store" && showDocumentNumbersOnline(transaction) ?
                                    <span>Order Number : {showDocumentNumbersOnline(transaction)}</span> : null}
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                {transaction.type === "store" && showDocumentNumbers(transaction) ?
                                    <span>Sales Doc : {showDocumentNumbers(transaction)}</span> : null}
                            </Typography>
                            <Typography className={classes.secondaryHeading}>Total price: {transaction.orderGrossTotal}
                                <span>{configData.currency}</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ) : null
            }

        </div>
    );
}

export default OrderHistory;