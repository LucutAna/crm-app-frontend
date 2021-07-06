import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {isNull} from 'lodash';
import Zoom from '@material-ui/core/Zoom';


import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalState";

import CouponsPageStyles from './CouponsPageStyles';
import MemberService from "../../shared/services/MemberService";

const CouponsPage = ({configData}) => {
    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: ' #d5d5d5',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 750,
            fontSize: theme.typography.pxToRem(6),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    const classes = CouponsPageStyles();
    const {coupons, customerData, addCoupons, deleteCoupons } = useContext(GlobalContext);
    const [customerCoupons, setCustomerCoupons] = useState([]);
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);

    //ToDo change logic when we will add translation
    const statusName = [
        {
            statusCode: 'C',
            statusCodeName: 'Canceled'
        },
        {
            statusCode: 'E',
            statusCodeName: 'Expired'
        },
        {
            statusCode: 'G',
            statusCodeName: 'Created'
        },
        {
            statusCode: 'I',
            statusCodeName: 'Issued'
        },
        {
            statusCode: 'P',
            statusCodeName: 'Issue pending'
        },
        {
            statusCode: 'U',
            statusCodeName: 'Redeemed'
        },
        {
            statusCode: 'X',
            statusCodeName: 'Annulled'
        }
    ];
    const displayStatusCodeName = code => statusName.map(status => status.statusCode === code ? status.statusCodeName : '');


    const headCells = [
        {id: 'code', label: 'Coupon Code'},
        {id: 'name', label: 'Coupon name'},
        {id: 'description', label: 'Coupon description'},
        {id: 'date', label: 'Coupon Date'},
        {id: 'valid', label: 'Expiration Date'},
        {id: 'redeem', label: 'Redeem Date'},
        {id: 'value', label: 'Coupon Value'},
        {id: 'status', label: 'Coupon Status'},
        {id: 'activationCode', label: 'Action'},
    ];

    const createData = (code, name, description, date, valid, redeem, value, status, activationCode) => {
        return {code, name, description, date, valid, redeem, value, status, activationCode};
    }

    useEffect(() => {
        setCustomerCoupons(Object.values(coupons).filter(item => item.endDate > moment().format('YYYY-MM-DDThh:mm:ss')))
    }, [coupons])


    useEffect(() => {
        if (customerCoupons.length > 0) {
            const rowData = [];
            customerCoupons.forEach(coupon => rowData.push(createData(coupon.couponCode, coupon.couponTypeName, coupon.couponTypeDescription, coupon.startDate, coupon.endDate, coupon.redemptionDate, coupon.value, coupon.statusCode, coupon.couponActivationCode)))
            setRows(rowData);
        }
    }, [customerCoupons])

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const EnhancedTableHead = (props) => {
        const {classes, order, orderBy, onRequestSort} = props;
        const createSortHandler = property => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            className={classes.headersTable}
                            key={headCell.id}
                            align="left"
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const formatDate = date => isNull(date) ? '' : moment(date).format(configData.modules.DATE_FORMAT.toUpperCase());

    const getCouponsCustomer = async (data) => {
        try {
            const coupons = await MemberService.getCoupons(data);
            //TODO: check if the logic below is deprecated
            // map(coupons.data, (coupon) => {
            //     if (isNil(coupon.couponTypeName_de_DE))
            //         coupon.typeName = coupon.couponTypeName;
            //     else
            //         coupon.typeName = coupon.couponTypeName_de_DE;
            //     if (isNil(coupon.couponTypeDescription_de_DE))
            //         coupon.typeDescription = coupon.couponTypeDescription;
            //     else
            //         coupon.typeDescription = coupon.couponTypeDescription_de_DE;
            // });
            setCustomerCoupons(coupons.data);
            addCoupons(coupons.data);
        } catch (error) {
            console.log(error);
        }
    };

    const changeStatusCoupon = async (couponSelected) => {
        const data = {
            activationStatusCode: couponSelected.activationCode === 'I' ? 'A' : 'I',
            couponCode: couponSelected.code,
            partyUid: customerData.partyUid,
            salesDivision: configData.salesDivision,
            subsidiary: configData.subsidiary
        }
        try {
            const activateDeactivate = await MemberService.activateDeactivateCoupons(data);
            if (activateDeactivate.data.status === 'SUCCESS') {
                deleteCoupons();
                const couponsPayload = {
                    partyUid: customerData.partyUid,
                    locale: configData.locales[0],
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                };
                getCouponsCustomer(couponsPayload);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Toolbar className={classes.highlight}>
                    <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                        Coupons
                    </Typography>
                    <Tooltip title="Filter list">
                        <IconButton fontSize="large" aria-label="filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow key={row.code}>
                                            <TableCell component="th" id={labelId} scope="row">
                                                {row.code}
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <HtmlTooltip arrow TransitionComponent={Zoom}
                                                         TransitionProps={{timeout: 500}}
                                                         title={
                                                             <React.Fragment>
                                                                 <Typography
                                                                     color="inherit">{row.description}</Typography>
                                                             </React.Fragment>
                                                         }
                                            >
                                                <TableCell className={classes.descriptionContainer}
                                                           align="left">{row.description}</TableCell>
                                            </HtmlTooltip>
                                            <TableCell align="left">{formatDate(row.date)}</TableCell>
                                            <TableCell align="left">{formatDate(row.valid)}</TableCell>
                                            <TableCell align="left">{formatDate(row.redeem)}</TableCell>
                                            <TableCell align="left">{row.value !== 0 ? row.value : ''}</TableCell>
                                            <TableCell align="left">{displayStatusCodeName(row.status)}</TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    onClick={() => changeStatusCoupon(row)}
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth
                                                    value={row}
                                                    size="small">
                                                    {(row.status === 'I' && row.activationCode === 'I') ?
                                                        'ACTIVATE' : (row.status === 'I' && row.activationCode === 'A') ?
                                                            'DEACTIVATE' : ''}
                                                </Button>
                                            </TableCell>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
export default CouponsPage;