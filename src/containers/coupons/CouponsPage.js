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
    const {customerData, addTransactions, addCoupons, deleteCoupons, coupons, ...rest} = useContext(GlobalContext);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const [firstFilterWasApplied, setFirstFilterWasApplied] = useState(false);
    const [secondFilterWasApplied, setSecondFilterWasApplied] = useState(false);
    const [thirdFilterWasApplied, setThirdFilterWasApplied] = useState(false);
    const [statusFilter, setStatusFilterOptions] = useState([]);
    const [couponNameFilter, setCouponNameFilterOptions] = useState([]);

    useEffect(() => {
        const couponsPayload = {
            partyUid: customerData.partyUid,
            locale: props.configData.locales[0],
            salesDivision: props.configData.salesDivision,
            subsidiary: props.configData.subsidiary
        };
        getCouponsCustomer(couponsPayload);
    }, [customerData]);

    const setInitialData = (coupons) => {
        setFilteredCoupons(coupons);
        const nameOptions = [];
        coupons.forEach(coupon => {
            if (!nameOptions.find(item => item === coupon.couponTypeName)) {
                nameOptions.push(coupon.couponTypeName);
            }
        })
        setCouponNameFilterOptions(nameOptions);

        const statusOptions = [];
        coupons.forEach(coupon => {
            if (!statusOptions.find(item => item.value === coupon.statusCode)) {
                switch (coupon.statusCode) {
                    case "E": {
                        statusOptions.push({value: coupon.statusCode, name: "Expired"})
                        break;
                    }
                    case "G": {
                        statusOptions.push({value: coupon.statusCode, name: "Created"})
                        break;
                    }
                    case "I": {
                        statusOptions.push({value: coupon.statusCode, name: "Issued"})
                        break;
                    }
                    case "P": {
                        statusOptions.push({value: coupon.statusCode, name: "Issue pending"})
                        break;
                    }
                    case "U": {
                        statusOptions.push({value: coupon.statusCode, name: "Redeemed"})
                        break;
                    }
                    case "X": {
                        statusOptions.push({value: coupon.statusCode, name: "Annulled"})
                    }
                }
            }
        })
        setStatusFilterOptions(statusOptions);
    }

    const couponsRefreshButton = () => {
        let allCoupons = [...Object.keys(coupons).map(item => coupons[item])];
        setFilteredCoupons(allCoupons);
    }

    const getCouponStatus = (coupon) => {
        switch (coupon.statusCode) {
            case "E": {
                return "Expired"
            }
            case "G": {
                return "Created"
            }
            case "I": {
                return "Issued"
            }
            case "P": {
                return "Issue pending"
            }
            case "U": {
                return "Redeemed"
            }
            case "X": {
                return "Annuleled"
            }
        }
    }
    const couponStatus = (coupon) => {
        if (coupon.couponActivationCode === "I") {
            return 'Deactivate'
        } else if (coupon.couponActivationCode === "A") {
            return 'Activate'
        }
    }

    const getCouponsCustomer = async (data) => {
        try {
            const coupons = await MemberService.getCoupons(data);
            addCoupons(coupons.data);
            setInitialData(coupons.data);
        } catch (error) {
            console.log(error);
        }
    }
    const changeStatusCoupon = async (couponSelected) => {
        const data = {
            activationStatusCode: couponSelected.couponActivationCode === 'I' ? 'A' : 'I',
            couponCode: couponSelected.couponCode,
            partyUid: customerData.partyUid,
            salesDivision: props.configData.salesDivision,
            subsidiary: props.configData.subsidiary
        }
        try {
            const activateDeactivate = await MemberService.activateDeactivateCoupons(data);
            if (activateDeactivate.data.status === 'SUCCESS') {
                deleteCoupons();
                const couponsPayload = {
                    partyUid: customerData.partyUid,
                    locale: props.configData.locales[0],
                    salesDivision: props.configData.salesDivision,
                    subsidiary: props.configData.subsidiary
                };
                await getCouponsCustomer(couponsPayload);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const filterByName = (param) => {
        let allCoupons = [...Object.keys(coupons).map(item => coupons[item])];

        if (!firstFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (!thirdFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (secondFilterWasApplied) {
            allCoupons = [...filteredCoupons];
        }
        if (param.target.value === 10) {
            setFilteredCoupons(allCoupons)
        } else {
            const nameFilter = allCoupons.filter(name => name.couponTypeName === param.target.value)
            setFilteredCoupons(nameFilter);
        }
    }

    const filterByCouponStatus = (param) => {
        let allCoupons = [...Object.keys(coupons).map(item => coupons[item])];

        if (!secondFilterWasApplied) {
            setSecondFilterWasApplied(true);
        }
        if (!thirdFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (firstFilterWasApplied) {
            allCoupons = [...filteredCoupons];
        }
        if (param.target.value === 10) {
            setFilteredCoupons(allCoupons);
        } else {
            const filteredCouponsByStatus = allCoupons.filter(coupon => coupon.statusCode === param.target.value)
            setFilteredCoupons(filteredCouponsByStatus);
        }
    }

    const filterByExpirationDate = (param) => {
        let allCoupons = [...Object.keys(coupons).map(item => coupons[item])];

        if (!thirdFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (!secondFilterWasApplied) {
            setFirstFilterWasApplied(true);
        }
        if (firstFilterWasApplied) {
            allCoupons = [...filteredCoupons];
        }
        if (param.target.value === 10) {
            setFilteredCoupons(allCoupons);
        }
        if (param.target.value === 20) {
            const expirationDate = moment().endOf('day').add(60, "days");
            const expirationDateSixtyDays = allCoupons.filter(currMonth => moment(currMonth.endDate).isBefore(expirationDate) && moment(currMonth.endDate).isAfter(moment()));
            setFilteredCoupons(expirationDateSixtyDays);
        }
    }
    return (
        <div>
            <h3>Coupons</h3>
            <Grid container style={{textAlign: "end"}}>
                <Grid container>
                    <Grid sm={2}>
                        <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select labelId="demo-simple-select-label"
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
                        <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={filterByCouponStatus}
                                >
                                    <MenuItem value={10}>Filter by coupon status</MenuItem>
                                    {statusFilter.map((status) => (
                                        <MenuItem value={status.value}>{status.name} </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid sm={2}>
                        <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select labelId="demo-simple-select-label"
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
                        <Button variant="contained" style={{marginLeft: "auto"}} endIcon={<RefreshIcon/>}
                                onClick={couponsRefreshButton}>Coupons refresh</Button>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized-table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Date</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Coupon Code</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Coupon Name</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Coupon Description</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Coupon Date</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Expiration Date</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Redeem Date</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Coupon Value</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Coupon Status</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCoupons.map((card) => (
                            <TableRow>
                                <TableCell>{moment(card.startDate).format("DD-MM-yyyy")}</TableCell>
                                <TableCell align="right">{card.couponCode}</TableCell>
                                <TableCell align="right">{card.couponTypeName}</TableCell>
                                <Tooltip title={card.couponTypeDescription}>
                                    <TableCell align="right">Coupon Description</TableCell>
                                </Tooltip>
                                <TableCell align="right">{}</TableCell>
                                <TableCell align="right">{moment(card.endDate).format("DD-MM-yyyy")}</TableCell>
                                <TableCell align="right">{card.redemptionDate}</TableCell>
                                <TableCell align="right">{card.value}</TableCell>
                                <TableCell align="right">{getCouponStatus(card)}</TableCell>
                                <TableCell align="right">
                                    {card.statusCode !== "E" && !card.redemptionDate ?
                                        <Button
                                            onClick={() => changeStatusCoupon(card)}
                                            variant="outlined"
                                            color="primary"
                                            fullWidth
                                            size="small">
                                            {couponStatus(card)}
                                        </Button> : false
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default CouponsPage;
