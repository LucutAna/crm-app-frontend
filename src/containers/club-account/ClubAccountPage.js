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
// import ClubAccountPageStyle from "./ClubAccountPageStyle";
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

    useEffect( () => {
      const {configData} = props;
      const data = {
          partyUid: customerData.partyUid,
          salesDivision: configData.salesDivision,
          subsidiary: configData.subsidiary
      }
      console.log("customerData",customerData)
      MemberService.getTransactions(data)
          .then( (result) =>{
              console.log('result data', result)
              setTransactions(result.data);
              setFilteredTransactions(result.data);

              const transactionsOptions =[];
              result.data.forEach(transaction =>{
                  if(!transactionsOptions.find(item => item.value  === transaction.transactionType)){
                      if(transaction.transactionType === "PT"){
                          transactionsOptions.push({value:transaction.transactionType, name:"Kontozusammenführung"})
                      }
                      if(transaction.transactionType === "EN") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Anmeldung"})
                      }
                      if(transaction.transactionType === "EV") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Externes Event"})
                      }
                      if(transaction.transactionType === "EX") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Punkteverfall"})
                      }
                      if(transaction.transactionType === "GW") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Manuelle Buchung"})
                      }
                      if(transaction.transactionType === "IR") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Verlängerte Umtauschzeit bei Online-Retouren"})
                      }
                      if(transaction.transactionType === "LO") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Kulanzlose"})
                      }
                      if(transaction.transactionType === "MM") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Kunden werben Kunden"})
                      }
                      if(transaction.transactionType === "MT") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Kündigung der Mitgliedschaft"})
                      }
                      if(transaction.transactionType === "PC") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Punktekorrektur"})
                      }
                      if(transaction.transactionType === "RL") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Level-Aufstieg"})
                      }
                      if(transaction.transactionType === "RT") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Retoure"})
                      }
                      if(transaction.transactionType === "SA") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Einkauf"})
                      }
                      if(transaction.transactionType === "ST") {
                          transactionsOptions.push({value: transaction.transactionType, name: "Gewinnstufe „Treue belohnen“ erreicht"})
                      }
                  }
              })
              setTransactionsFilterOptions(transactionsOptions);
              console.log("transactions options",transactionsOptions);
          })
    },[customerData])

    useEffect(() => {
        console.log('rest', rest)
    }, [rest])

    const refreshPage = () => {
        setFilteredTransactions(transactions);
    }
    const getTransactionType = (transactions) =>{
        if(transactions.transactionType === "PT"){
            return "Kontozusammenführung"
        }
        if(transactions.transactionType === "EN"){
            return "Anmeldung"
        }
        if(transactions.transactionType === "EV"){
            return "Externes Event"
        }
        if(transactions.transactionType === "EX"){
            return "Punkteverfall"
        }
        if(transactions.transactionType === "GW"){
            return "Manuelle Buchung"
        }
        if(transactions.transactionType === "IR"){
            return "Verlängerte Umtauschzeit bei Online-Retouren"
        }
        if(transactions.transactionType === "LO"){
            return "Kulanzlose"
        }
        if(transactions.transactionType === "MM"){
            return "Kunden werben Kunden"
        }
        if(transactions.transactionType === "MT"){
            return "Kündigung der Mitgliedschaft"
        }
        if(transactions.transactionType === "PC"){
            return "Punktekorrektur"
        }
        if(transactions.transactionType === "RL"){
            return "Level-Aufstieg"
        }
        if(transactions.transactionType === "RT"){
            return "Retoure"
        }
        if(transactions.transactionType === "SA"){
            return "Einkauf"
        }
        if(transactions.transactionType === "ST"){
            return "Gewinnstufe „Treue belohnen“ erreicht"
        }
    }
   const transactionsFilter= (param) =>{
        console.log("filter 1", param.target.value)

       let allTransactions = [...transactions];

       if (!firstFilterWasApplied) {
           setFilterWasApplied(true);
       }

       if (secondFilterWasApplied) {
           allTransactions = [...filteredTransactions];
       }

       if(param.target.value === 10)
       {
           setFilteredTransactions(allTransactions);
       }
       else
       {
           const transactionsTypeFilter= allTransactions.filter(trans => trans.transactionType === param.target.value)
           setFilteredTransactions(transactionsTypeFilter);
           console.log("transantion type", transactionsTypeFilter);
       }
   }
    const transactionsMonthFilter= (param) =>{

        let allTransactions = [...transactions];

        if (!secondFilterWasApplied) {
            setSecondFilterWasApplied(true);
        }

        if (firstFilterWasApplied) {
            allTransactions = [...filteredTransactions];
        }

        console.log("filter 2", param.target.value)
        if(param.target.value === 10)
        {
            var dateEndOf = moment(Date.now()).endOf('month').format('YYYY-MM-DD');
            var dateStartOf = moment(Date.now()).startOf('month').format('YYYY-MM-DD');

            const currentMonthTransactions = allTransactions.filter(currMonth => moment(currMonth.processingDate).isBetween(dateStartOf, dateEndOf))
            setFilteredTransactions(currentMonthTransactions);
            console.log("filter current month")
        }
        else if(param.target.value === 20)
        {
            var dateEndOf = moment(Date.now()).subtract(1,'months').endOf('month').format('YYYY-MM-DD');
            var dateStartOf = moment(Date.now()).subtract(1,'months').startOf('month').format('YYYY-MM-DD');

            const lastMonthTransactions = allTransactions.filter(currMonth => moment(currMonth.processingDate).isBetween(dateStartOf, dateEndOf))
            setFilteredTransactions(lastMonthTransactions);
            console.log("filter last month", lastMonthTransactions);
        }
        else if(param.target.value === 30)
        {
            var dateStartOf = moment(Date.now()).subtract(6,'months').startOf('month').format('YYYY-MM-DD');

            const lastMonthTransactions = allTransactions.filter(currMonth => moment(currMonth.processingDate).isSameOrAfter(dateStartOf))
            setFilteredTransactions(lastMonthTransactions);
            console.log("filter last 6 months", lastMonthTransactions);
        }
        else if(param.target.value === 40)
        {
            setFilteredTransactions(allTransactions);
            console.log("everyone", allTransactions);
        }
    }
      return(
          <div>
              <Grid container style={{textAlign:"end"}}>
                  <Grid sm={2} >
           <Box sx={{ minWidth: 120 }}>
               <FormControl fullWidth>
                  <InputLabel id="select-label">All transactions</InputLabel>
                  <Select    labelId="select-label"
                       id="simple-select"
                             onChange={transactionsFilter}>
                      <MenuItem value={10}>All Transactions</MenuItem>
                      {transactionsFilterOptions.map((transaction) =>(
                          <MenuItem value={transaction.value}>{transaction.name}</MenuItem>
                      ))}
                   </Select>
               </FormControl>
           </Box>
                  </Grid>
                  <Grid sm={2}>
                      <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                              <InputLabel id="select-label">Everyone</InputLabel>
                              <Select    labelId="select-label"
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
                      <Button variant="contained" style={{ marginLeft:"auto"}} endIcon={<RefreshIcon/>} onClick={refreshPage} >Page refresh</Button>
                  </Grid>
              </Grid>
     <TableContainer component={Paper}>
         <Table sx={{minWidth: 700}} aria-label="customized-table">
             <TableHead>
                 <TableRow>
                   <TableCell style={{fontWeight:"bold"}}>Date</TableCell>
                     <TableCell align="right" style={{fontWeight:"bold"}}>Action</TableCell>
                     <TableCell align="right" style={{fontWeight:"bold"}}>Document</TableCell>
                     <TableCell align="right" style={{fontWeight:"bold"}}>Re-registered</TableCell>
                     <TableCell align="right" style={{fontWeight:"bold"}}>Euro</TableCell>
                     <TableCell align="right" style={{fontWeight:"bold"}}>Transaction ID</TableCell>
                 </TableRow>
             </TableHead>
             <TableBody>
                {filteredTransactions.map((card) => (
                    <TableRow>
                        <TableCell >{moment(card.processingDate).format("DD-MM-yyyy")}</TableCell>
                        <TableCell align="right" >{getTransactionType(card)}</TableCell>
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
