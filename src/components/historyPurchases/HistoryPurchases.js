import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {isEmpty} from 'lodash';
import moment from 'moment';
import {useState, useEffect} from 'react';
import HistoryPurchasesStyles from './HistoryPurchasesStayles';
import StoreIconMM from '../../assets/images/paperless_life_store.png';
import OnlineIconMM from '../../assets/images/paperless_life_online.png';
import Spinner from '../../components/spinners/customSpinner/CustomSpinner';
import i18next from "i18next";

const HistoryPurchases = ({salesOrderHistory, configData, openSpinnerHistoryPurchase}) => {
    const classes = HistoryPurchasesStyles();
    const [rows, setRows] = useState([]);
    const createData = (date, market, currency, orderNumber, type) => {
        return {date, market, currency, orderNumber, type};
    }
    useEffect(() => {
        if (!isEmpty(salesOrderHistory) && !isEmpty(configData)) {
            let ordersDetails = [];
            salesOrderHistory.forEach(order => {
                ordersDetails.push(createData(moment(order.date).format(configData.modules.DATE_FORMAT.toUpperCase()), order.storeName, order.orderGrossTotal, order.orderNumber, order.type));
            });
            setRows(ordersDetails);
        }
    }, [salesOrderHistory, configData])


    return (
        <Paper elevation={3}>
            <h3 className={classes.paperHeader}>{i18next.t('TAB_ORDER_HISTORY')}</h3>
            {!isEmpty(salesOrderHistory) && !isEmpty(configData) && !isEmpty(rows) ?
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date </TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Market</TableCell>
                                <TableCell align="right">EUR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.orderNumber}>
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="center">
                                        <img src={row.type === 'store' ? StoreIconMM : OnlineIconMM} height="20"
                                             alt="logo-transaction"/>
                                    </TableCell>
                                    <TableCell align="left">{row.market}</TableCell>
                                    <TableCell align="right">{row.currency}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : <Spinner openSpinner={openSpinnerHistoryPurchase}/>}
        </Paper>
    );
}
export default HistoryPurchases;
