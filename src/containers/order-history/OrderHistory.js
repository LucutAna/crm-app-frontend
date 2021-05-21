import Accordion from '@material-ui/core/Accordion';
import {useEffect, useState} from "react";
import moment from "moment";
import {isEmpty, uniq, forEach, isNull} from 'lodash';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderHistoryStyles from "./OrderHistoryStyles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PrintIcon from '@material-ui/icons/Print';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    const [value, setValue] = useState(0);

    useEffect(() => {
        setTransactions(transactionsHistory);
    }, [transactionsHistory]);

    const filterOrderHistory = (event, newValue) => {
        setValue(newValue);
        setExpanded(false);
        if(newValue === 0) {
            setTransactions(transactionsHistory);
        }

        if(newValue === 1) {
            const storeTransactions = transactionsHistory.filter(transaction => transaction.type === 'store');
            setTransactions(storeTransactions);
        }

        if(newValue === 2) {
            const onlineTransactions = transactionsHistory.filter(transaction => transaction.type === 'online');
            setTransactions(onlineTransactions);
        }

    };

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

    const printOrder = (order) => {
        console.log(order);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.filterTab}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={filterOrderHistory}
                    aria-label="disabled tabs example"
                >
                    <Tab label="All" />
                    <Tab label="Store" />
                    <Tab label="Online" />
                </Tabs>
            </Paper>
            {
                transactions.length > 0 ? transactions.map(
                    (transaction, index) => <Accordion className={classes.accordionContainer}
                                                       key={transaction.orderNumber} expanded={expanded === index}
                                                       onChange={handleChange(index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
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
                        <Divider/>
                        {
                            transaction.orderDetails.map((order, index) =>
                                <AccordionDetails key={index} className={classes.accordionDetails}>
                                    <div className={classes.orderDetails}>
                                        <Typography className={classes.productDetails}>
                                            <span>Article {index + 1} of </span>
                                            <span>{transaction.orderDetails.length}</span>
                                            <span> | Quantity {order.quantity}</span>
                                            {!isNull(order.salesDocNo) ?
                                                <span> | Sales Document {order.salesDocNo}</span> : null}
                                        </Typography>
                                        <Typography>
                                            <span>{order.productName}</span>
                                            <span>(Art Nr: {order.productId})</span>
                                        </Typography>
                                    </div>
                                    <div className={classes.orderDetails}>
                                        <Typography
                                            className={classes.productDetails}><span>Single price: {order.unitPrice} {configData.currency}</span></Typography>
                                        <Typography
                                            className={classes.productDetails}><span>Total price: {order.totalLineItemPrice} {configData.currency}</span></Typography>
                                    </div>
                                </AccordionDetails>)

                        }
                        <Divider/>
                        <div className={classes.btnWrapper}>
                            <Button size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => printOrder(transaction)}>
                                <PrintIcon fontSize="small"/>Print
                            </Button>
                        </div>
                    </Accordion>
                ) : null
            }

        </div>
    );
}

export default OrderHistory;