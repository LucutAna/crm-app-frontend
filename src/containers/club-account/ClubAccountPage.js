import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {Select, TableCell} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import {useContext, useEffect, useState} from "react";
import MemberService from "../../shared/services/MemberService";
import {GlobalContext} from "../../context/GlobalState";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import moment from "moment";
import i18next from "i18next";

const ClubAccountPage = (props) => {
    const {customerData, addTransactions, addCoupons, deleteCoupons} = useContext(GlobalContext);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [firstFilterWasApplied, setFilterWasApplied] = useState(false);
    const [secondFilterWasApplied, setSecondFilterWasApplied] = useState(false);
    const [transactionsFilterOptions, setTransactionsFilterOptions] = useState([]);

    useEffect(async () => {
        const {configData} = props;
        const data = {
            partyUid: customerData.partyUid,
            salesDivision: configData.salesDivision,
            subsidiary: configData.subsidiary
        }
        const result = await MemberService.getTransactions(data)
        setTransactions(result.data);
        setFilteredTransactions(result.data);


        // const language = await ConfigService.getLanguage(data)
        // setLanguage(language.data);
        // console.log('translations',language.data);


        const transactionsOptions = [];
        result.data.forEach(transaction => {
            if(!transactionsOptions.find(item => item.value === transaction.transactionType)) {
                switch(transaction.transactionType){
                    case "PT": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_PT')})
                        break;
                    }
                    case "EN": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_EN')})
                        break;
                    }
                    case "EV": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_EV')})
                        break;
                    }
                    case "EX": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_EX')})
                        break;
                    }
                    case  "GW": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_GW')})
                        break;
                    }
                    case "IR": {
                        transactionsOptions.push({
                            value: transaction.transactionType,
                            name: i18next.t('TRANSACTION_TYPE_IR')
                        })
                        break;
                    }
                    case "LO": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_LO')})
                        break;
                    }
                    case "MM": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_MM')})
                        break;
                    }
                    case "MT": {
                        transactionsOptions.push({
                            value: transaction.transactionType,
                            name: i18next.t('TRANSACTION_TYPE_MT')
                        })
                        break;
                    }
                    case "PC": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_PC')})
                        break;
                    }
                    case "RL": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_RL')})
                        break;
                    }
                    case "RT": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_RT')})
                        break;
                    }
                    case "SA": {
                        transactionsOptions.push({value: transaction.transactionType, name: i18next.t('TRANSACTION_TYPE_SA')})
                        break;
                    }
                    case "ST": {
                        transactionsOptions.push({
                            value: transaction.transactionType,
                            name: i18next.t('TRANSACTION_TYPE_ST')
                        })
                    }
                }
            }
        })
        setTransactionsFilterOptions(transactionsOptions);
    }, [customerData])

    const refreshPage = () => {
        setFilteredTransactions(transactions);
    }
    const getTransactionType = (transactions) => {
        switch (transactions.transactionType) {
            case "PT": {
                return i18next.t('TRANSACTION_TYPE_PT')
            }
            case "EN": {
                return i18next.t('TRANSACTION_TYPE_EN')
            }
            case "EV": {
                return i18next.t('TRANSACTION_TYPE_EV')
            }
            case "EX": {
                return i18next.t('TRANSACTION_TYPE_EX')
            }
            case "GW": {
                return i18next.t('TRANSACTION_TYPE_GW')
            }
            case "IR": {
                return i18next.t('TRANSACTION_TYPE_IR')
            }
            case "LO": {
                return i18next.t('TRANSACTION_TYPE_LO')
            }
            case "MM": {
                return i18next.t('TRANSACTION_TYPE_MM')
            }
            case "MT": {
                return i18next.t('TRANSACTION_TYPE_MT')
            }
            case "PC": {
                return i18next.t('TRANSACTION_TYPE_PC')
            }
            case "RL": {
                return i18next.t('TRANSACTION_TYPE_RL')
            }
            case "RT": {
                return i18next.t('TRANSACTION_TYPE_RT')
            }
            case "SA": {
                return i18next.t('TRANSACTION_TYPE_SA')
            }
            case "ST": {
                return i18next.t('TRANSACTION_TYPE_ST')
            }
        }
    }
    const transactionsFilter = (param) => {
        let allTransactions = [...transactions];

        if (!firstFilterWasApplied) {
            setFilterWasApplied(true);
        }
        if (secondFilterWasApplied) {
            allTransactions = [...filteredTransactions];
        }
        if (param.target.value === 10) {
            setFilteredTransactions(allTransactions);
        } else {
            const transactionsTypeFilter = allTransactions.filter(trans => trans.transactionType === param.target.value)
            setFilteredTransactions(transactionsTypeFilter);
        }
    }
    const transactionsMonthFilter = (param) => {

        let allTransactions = [...transactions];

        if (!secondFilterWasApplied) {
            setSecondFilterWasApplied(true);
        }
        if (firstFilterWasApplied) {
            allTransactions = [...filteredTransactions];
        }
        if (param.target.value === 10) {
            const dateEndOf = moment(Date.now()).endOf('month').format('YYYY-MM-DD');
            const dateStartOf = moment(Date.now()).startOf('month').format('YYYY-MM-DD');

            const currentMonthTransactions = allTransactions.filter(currMonth => moment(currMonth.processingDate).isBetween(dateStartOf, dateEndOf))
            setFilteredTransactions(currentMonthTransactions);
            console.log("filter current month")
        } else if (param.target.value === 20) {
            const dateEndOf = moment(Date.now()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
            const dateStartOf = moment(Date.now()).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
            const lastMonthTransactions = allTransactions.filter(currMonth => moment(currMonth.processingDate).isBetween(dateStartOf, dateEndOf))
            setFilteredTransactions(lastMonthTransactions);
        } else if (param.target.value === 30) {
            const dateStartOf = moment(Date.now()).subtract(6, 'months').startOf('month').format('YYYY-MM-DD');
            const lastMonthTransactions = allTransactions.filter(currMonth => moment(currMonth.processingDate).isSameOrAfter(dateStartOf))
            setFilteredTransactions(lastMonthTransactions);
        } else if (param.target.value === 40) {
            setFilteredTransactions(allTransactions);
        }
    }

    const displayFilteredTransactions = (transactions) => {
        const compareDate = moment('2022-06-07');
        let transactionDate = new Date(transactions);
        return  transactionDate.getTime() < compareDate;
    }

    return (
        <div>
            <Grid container style={{textAlign: "end"}}>
                <Grid sm={2}>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">{i18next.t('TRANSACTION_TYPE_ALL')}</InputLabel>
                            <Select labelId="select-label"
                                    id="simple-select"
                                    onChange={transactionsFilter}>
                                <MenuItem value={10}>{i18next.t('TRANSACTION_TYPE_ALL')}</MenuItem>
                                {transactionsFilterOptions.map((transaction) => (
                                    <MenuItem key={transaction.id} value={transaction.value}>{transaction.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid sm={2}>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">{i18next.t('TRANSACTION_TIME_ALL_TIME')}</InputLabel>
                            <Select labelId="select-label"
                                    id="simple-select"
                                    onChange={transactionsMonthFilter}>
                                <MenuItem value={10}>{i18next.t('TRANSACTION_TIME_THIS_MONTH')}</MenuItem>
                                <MenuItem value={20}>{i18next.t('TRANSACTION_TIME_LAST_MONTH')}</MenuItem>
                                <MenuItem value={30}>{i18next.t('TRANSACTION_TIME_LAST_6_MONTHS')}</MenuItem>
                                <MenuItem value={40}>{i18next.t('TRANSACTION_TIME_ALL_TIME')}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid sm={8}>
                    <Button variant="contained" style={{marginLeft: "auto"}} endIcon={<RefreshIcon/>}
                            onClick={refreshPage}>Page refresh</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized-table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>{i18next.t('LBL_DATE')}</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>{i18next.t('LBL_ACTION')}</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>{i18next.t('LBL_DOCUMENT_TYPE')}</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>{i18next.t('LBL_POST_REGISTERED')}</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>{i18next.t('LBL_EURO')}</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>{i18next.t('LBL_TRANSACTION_ID')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map((card)=> (
                            <TableRow key={card.id}>
                                <TableCell>{moment(card.processingDate).format("DD-MM-yyyy")}</TableCell>
                                <TableCell align="right">{getTransactionType(card)}</TableCell>
                                <TableCell align="right">{card.documentTypeCode}</TableCell>
                                <TableCell align="right">
                                    {card.belated !== null && <input type="checkbox"
                                                                     disabled={true}
                                                                     checked={card.belated === true}
                                    >
                                    </input>}
                                </TableCell>
                                <TableCell align="right">{card.retailPrice}</TableCell>
                                <TableCell align="right">{card.loyaltyTransactionId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default ClubAccountPage;
