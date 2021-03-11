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
import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const SideBarNav = ({drawerWidth, open, onHandleDrawerClose}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        }
    }));
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={onHandleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <MenuList>
                <MenuItem>
                    <NavLink to='/crm'>
                        <ListItemIcon>
                            <HomeIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Home</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/dashboard'>
                        <ListItemIcon>
                            <DashboardIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Dashboard</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/order-history'>
                        <ListItemIcon>
                            <ReceiptIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Order History</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/coupons'>
                        <ListItemIcon>
                            <CreditCardIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Coupons</Typography>
                    </NavLink>
                </MenuItem>
            </MenuList>
            <Divider/>
        </Drawer>
    )
}

export default SideBarNav;