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

const ClubAccountPage = (props) => {
    const {customerData, addTransactions, addCoupons, deleteCoupons, ...rest} = useContext(GlobalContext);
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

        const transactionsOptions = [];
        result.data.forEach(transaction => {
            if(!transactionsOptions.find(item => item.value === transaction.transactionType)) {
                switch(transaction.transactionType){
                    case "PT": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Kontozusammenführung"})
                        break;
                    }
                    case "EN": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Anmeldung"})
                        break;
                    }
                    case "EV": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Externes Event"})
                        break;
                    }
                    case "EX": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Punkteverfall"})
                        break;
                    }
                    case  "GW": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Manuelle Buchung"})
                        break;
                    }
                    case "IR": {
                        transactionsOptions.push({
                            value: transaction.transactionType,
                            name: "Verlängerte Umtauschzeit bei Online-Retouren"
                        })
                        break;
                    }
                    case "LO": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Kulanzlose"})
                        break;
                    }
                    case "MM": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Kunden werben Kunden"})
                        break;
                    }
                    case "MT": {
                        transactionsOptions.push({
                            value: transaction.transactionType,
                            name: "Kündigung der Mitgliedschaft"
                        })
                        break;
                    }
                    case "PC": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Punktekorrektur"})
                        break;
                    }
                    case "RL": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Level-Aufstieg"})
                        break;
                    }
                    case "RT": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Retoure"})
                        break;
                    }
                    case "SA": {
                        transactionsOptions.push({value: transaction.transactionType, name: "Einkauf"})
                        break;
                    }
                    case "ST": {
                        transactionsOptions.push({
                            value: transaction.transactionType,
                            name: "Gewinnstufe „Treue belohnen“ erreicht"
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
                return "Kontozusammenführung"
            }
            case "EN": {
                return "Anmeldung"
            }
            case "EV": {
                return "Externes Event"
            }
            case "EX": {
                return "Punkteverfall"
            }
            case "GW": {
                return "Manuelle Buchung"
            }
            case "IR": {
                return "Verlängerte Umtauschzeit bei Online-Retouren"
            }
            case "LO": {
                return "Kulanzlose"
            }
            case "MM": {
                return "Kunden werben Kunden"
            }
            case "MT": {
                return "Kündigung der Mitgliedschaft"
            }
            case "PC": {
                return "Punktekorrektur"
            }
            case "RL": {
                return "Level-Aufstieg"
            }
            case "RT": {
                return "Retoure"
            }
            case "SA": {
                return "Einkauf"
            }
            case "ST": {
                return "Gewinnstufe „Treue belohnen“ erreicht"
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
    return (
        <div>
            <Grid container style={{textAlign: "end"}}>
                <Grid sm={2}>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">All transactions</InputLabel>
                            <Select labelId="select-label"
                                    id="simple-select"
                                    onChange={transactionsFilter}>
                                <MenuItem value={10}>All Transactions</MenuItem>
                                {transactionsFilterOptions.map((transaction) => (
                                    <MenuItem value={transaction.value}>{transaction.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid sm={2}>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Everyone</InputLabel>
                            <Select labelId="select-label"
                                    id="simple-select"
                                    onChange={transactionsMonthFilter}>
                                <MenuItem value={10}>Current month</MenuItem>
                                <MenuItem value={20}>Last month</MenuItem>
                                <MenuItem value={30}>Last 6 months</MenuItem>
                                <MenuItem value={40}>Everyone</MenuItem>
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
                            <TableCell style={{fontWeight: "bold"}}>Date</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Action</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Document</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Re-registered</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Euro</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Transaction ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map((card) => (
                            <TableRow>
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
