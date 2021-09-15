import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalState";
import MemberService from "../../shared/services/MemberService";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from '@material-ui/core/Tooltip';

const CouponsPage = (props) => {
    const {customerData, addTransactions, addCoupons, deleteCoupons, ...rest} = useContext(GlobalContext);
    const [coupons, setCoupons] = useState([]);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const [firstFilterWasApplied, setFirstFilterWasApplied] = useState(false);
    const [secondFilterWasApplied, setSecondFilterWasApplied] = useState(false);
    const [thirdFilterWasApplied, setThirdFilterWasApplied] = useState(false);
    const [statusFilter, setStatusFilterOptions] = useState([]);
    const [couponNameFilter, setCouponNameFilterOptions] = useState([]);

    useEffect(() => {
        const {configData} = props;
        const data = {
            locale: customerData.locale,
            partyUid: customerData.partyUid,
            salesDivision: configData.salesDivision,
            subsidiary: configData.subsidiary
        }
        MemberService.getCoupons(data)
            .then((result) => {
                setCoupons(result.data);
                setFilteredCoupons(result.data);

                const nameOptions = [];
                result.data.forEach(coupon => {
                    if(!nameOptions.find(item => item === coupon.couponTypeName))
                    {
                        nameOptions.push(coupon.couponTypeName);
                    }
                })
                setCouponNameFilterOptions(nameOptions);

                const statusOptions = [];
                result.data.forEach(coupon => {
                    if(!statusOptions.find(item => item.value === coupon.statusCode)){
                        if(coupon.statusCode === "E")
                        {
                            statusOptions.push({value: coupon.statusCode, name:"Expired"})
                        }
                        if(coupon.statusCode === "G")
                        {
                            statusOptions.push({value: coupon.statusCode, name:"Created"})
                        }
                        if(coupon.statusCode === "I")
                        {
                            statusOptions.push({value: coupon.statusCode, name:"Issued"})
                        }
                        if(coupon.statusCode === "P")
                        {
                            statusOptions.push({value: coupon.statusCode, name:"Issue pending"})
                        }
                        if(coupon.statusCode === "U")
                        {
                            statusOptions.push({value: coupon.statusCode, name:"Redeemed"})
                        }
                        if(coupon.statusCode === "X")
                        {
                            statusOptions.push({value: coupon.statusCode, name:"Annulled"})
                        }
                    }
                })
                setStatusFilterOptions(statusOptions);
            })
    }, [customerData])

    const couponsRefreshButton = () => {
        setFilteredCoupons(coupons);
    }

    const getCouponStatus = (coupon) =>{
        if(coupon.statusCode === "E"){
            return "Expired"
        }
        if(coupon.statusCode === "G"){
            return "Created"
        }
        if(coupon.statusCode === "I"){
            return "Issued"
        }
        if(coupon.statusCode === "P"){
            return "Issue pending"
        }
        if(coupon.statusCode === "U"){
            return "Redeemed"
        }
        if(coupon.statusCode === "X"){
            return "Annuleled"
        }
    }
    const couponStatus = (coupon) =>{
        if(coupon.couponActivationCode === "I"){
            return 'Active'
        }
        else if(coupon.couponActivationCode === "A"){
            return 'Inactive'
        }
    }
    const filterByName= (param) =>{
        let allCoupons = [...coupons];

        if (!firstFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (!thirdFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (secondFilterWasApplied) {
            allCoupons = [...filteredCoupons];
        }
        if(param.target.value === 10){
            setFilteredCoupons(allCoupons)
        }
        else
        {
            const nameFilter = allCoupons.filter(name => name.couponTypeName === param.target.value)
            setFilteredCoupons(nameFilter);
        }
    }

    const filterByCouponStatus = (param) =>{
        let allCoupons = [...coupons];

        if (!secondFilterWasApplied) {
            setSecondFilterWasApplied(true);
        }
        if (!thirdFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (firstFilterWasApplied) {
            allCoupons = [...filteredCoupons];
        }
        if(param.target.value === 10)
        {
            setFilteredCoupons(allCoupons);
        }
        else
        {
            const filteredCouponsByStatus = allCoupons.filter(coupon => coupon.statusCode === param.target.value)
            setFilteredCoupons(filteredCouponsByStatus);
        }
    }

    const filterByExpirationDate = (param) => {
        let allCoupons = [...coupons];
        if (!thirdFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (!secondFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (firstFilterWasApplied) {
            allCoupons = [...filteredCoupons];
        }
        if(param.target.value === 10){
            setFilteredCoupons(allCoupons);
        }
        if(param.target.value === 20){
            const expirationDate = moment().endOf('day').add(60, "days");
            const expirationDateSixtyDays = allCoupons.filter(currMonth => moment(currMonth.endDate).isBefore(expirationDate) && moment(currMonth.endDate).isAfter(moment()));
            setFilteredCoupons(expirationDateSixtyDays);
        }
    }

    return(
        <div>
            <h3>Coupons</h3>
            <Grid container style={{textAlign:"end"}}>
                <Grid container>
                    <Grid sm={2}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select    labelId="demo-simple-select-label"
                                           id="demo-simple-select"
                                           onChange={filterByName}
                                >
                                    <MenuItem value={10}>Filter by coupon name</MenuItem>
                                    {couponNameFilter.map((name) => (
                                        <MenuItem value={name}>{name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid sm={2}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select    labelId="demo-simple-select-label"
                                           id="demo-simple-select"
                                           onChange={filterByCouponStatus}
                                >
                                    <MenuItem value={10}>Filter by coupon status</MenuItem>
                                    {statusFilter.map((status) =>(
                                        <MenuItem value={status.value}>{status.name} </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid sm={2}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select    labelId="demo-simple-select-label"
                                           id="demo-simple-select"
                                           onChange={filterByExpirationDate}
                                >
                                    <MenuItem value={10}>Filter by expiration period</MenuItem>
                                    <MenuItem value={20}>Expiration date in the next 60 days</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid sm={6}>
                        <Button variant="contained" style={{ marginLeft:"auto"}} endIcon={<RefreshIcon/>} onClick={couponsRefreshButton}  >Coupons refresh</Button>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized-table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"bold"}}>Date</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Coupon Code</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Coupon Name</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Coupon Description</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Coupon Date</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Expiration Date</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Redeem Date</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Coupon Value</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Coupon Status</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCoupons.map((card) => (
                            <TableRow>
                                <TableCell >{moment(card.startDate).format("DD-MM-yyyy")}</TableCell>
                                <TableCell align="right" >{card.couponCode}</TableCell>
                                <TableCell align="right">{card.couponTypeName}</TableCell>
                                <Tooltip title={card.couponTypeDescription} >
                                    <TableCell align="right">Coupon Description</TableCell>
                                </Tooltip>
                                <TableCell align="right">{}</TableCell>
                                <TableCell align="right">{moment(card.endDate).format("DD-MM-yyyy")}</TableCell>
                                <TableCell align="right">{card.redemptionDate}</TableCell>
                                <TableCell align="right">{card.value}</TableCell>
                                <TableCell align="right">{getCouponStatus(card)}</TableCell>
                                <TableCell align="right">{couponStatus(card)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default CouponsPage;
