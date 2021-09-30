import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {NavLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EmailIcon from '@material-ui/icons/Email';
import React from "react";
import clsx from 'clsx';
import {useTheme} from "@material-ui/core/styles";

import SideBarNavStyles from './SideBarNavStyles'

const SideBarNav = ({open, onHandleDrawerClose}) => {
    const classes = SideBarNavStyles();
    const theme = useTheme();
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
            >
            <div className={classes.toolbar}>
                <IconButton onClick={onHandleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <MenuList>
                <MenuItem>
                    <NavLink className={classes.listItemIcon} to='/crm'>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <Typography variant="inherit">Home</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink className={classes.listItemIcon} to='/dashboard'>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <Typography variant="inherit">Dashboard</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink className={classes.listItemIcon} to='/order-history'>
                        <ListItemIcon>
                            <ReceiptIcon/>
                        </ListItemIcon>
                        <Typography variant="inherit">Order History</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink className={classes.listItemIcon} to='/coupons'>
                        <ListItemIcon>
                            <CreditCardIcon/>
                        </ListItemIcon>
                        <Typography variant="inherit">Coupons</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink className={classes.listItemIcon} to='/club-account'>
                        <ListItemIcon>
                            <AccountBalanceWalletIcon/>
                        </ListItemIcon>
                        <Typography variant="inherit">Club Account</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink className={classes.listItemIcon} to='/channel-permissions'>
                        <ListItemIcon>
                            <EmailIcon/>
                        </ListItemIcon>
                        <Typography variant="inherit">Channel Permissions</Typography>
                    </NavLink>
                </MenuItem>
            </MenuList>
        </Drawer>
    )
}

export default SideBarNav;
