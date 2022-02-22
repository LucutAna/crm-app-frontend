import React, {useContext, useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Select, TableCell} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {GlobalContext} from "../../context/GlobalState";
import MemberService from "../../shared/services/MemberService";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import moment from "moment";
import TableBody from "@material-ui/core/TableBody";

const TransactionsBits = (props) => {
    const {customerData, addTransactions, ...rest} = useContext(GlobalContext);
    const [transactions, setTransactions] = useState([]);
    const [bitss, setBits] = useState([]);
    const [bitsType, setBitsType] = useState('');
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
        const result = await MemberService.getHousehold(data)
        setBits(result.data[0].bitsBalances);
        const bitsTypeFound = result.data[0].bitsBalances.find(item => item.bitsType === 'PT');
        setBitsType(bitsTypeFound);

        const resultTransactions = await MemberService.getTransactions(data)
        setTransactions(resultTransactions.data);
        setFilteredTransactions(resultTransactions.data);

        const transactionsOptions = [];
        resultTransactions.data.forEach(transaction => {
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
    },[customerData]);

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
    const refreshTransactions = () => {
        setBits(bitss);
        setFilteredTransactions(transactions);
    }

    return(
        <div>
            <Grid container style={{textAlign: "end"}}>
                <Grid sm={2}>
                    <label>Total bits </label>
                    <div>{bitsType.bookedBits}</div>
                </Grid>
                <Grid sm={2}>
                    <label>Pending bits</label>
                    <div>{bitsType.pendingBits}</div>
                </Grid>
                <Grid sm={4}>
                    <Button variant="contained" endIcon={<RefreshIcon/>} onClick={refreshTransactions}>Refresh transactions</Button>
                </Grid>
            </Grid>
            <Grid container style={{textAlign: "end"}}>
                <Grid sm={2}>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">All transactions</InputLabel>
                            <Select labelId="select-label"
                                    id="simple-select"
                                    onChange={transactionsFilter}
                            >
                                <MenuItem value={10}>All Transactions</MenuItem>
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
                            <InputLabel id="select-label">Everyone</InputLabel>
                            <Select labelId="select-label"
                                    id="simple-select"
                                    onChange={transactionsMonthFilter}
                            >
                                <MenuItem value={10}>Current month</MenuItem>
                                <MenuItem value={20}>Last month</MenuItem>
                                <MenuItem value={30}>Last 6 months</MenuItem>
                                <MenuItem value={40}>Everyone</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized-table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Date</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Transaction</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Document Type</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Registered</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Value</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Bits</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Transaction ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map((card) => (
                            <TableRow key={card.id}>
                                <TableCell>{moment(card.processingDate).format("DD-MM-yyyy")}</TableCell>
                                <TableCell align="right">{getTransactionType(card)}</TableCell>
                                <TableCell align="right">{card.documentTypeCode}</TableCell>
                                <TableCell align="right">
                                    {card.belated !== null && <input type="checkbox"
                                                                     disabled={true}
                                                                     checked={card.belated === true}
                                    >
                                    </input>}</TableCell>
                                <TableCell align="right">{card.retailPrice}</TableCell>
                                <TableCell align="right">{card.bitsBalances && card.bitsBalances[0] && card.bitsBalances[0].bits}</TableCell>
                                <TableCell align="right">{card.loyaltyTransactionId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TransactionsBits;