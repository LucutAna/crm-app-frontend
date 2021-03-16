import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {NavLink} from "react-router-dom";

import HeaderStyles from './HeaderStyles'
import clubLogo from '../../assets/images/logo_MM_CLUB.png'

const Header = ({open, configData, onHandleDrawerOpen}) => {
    const classes = HeaderStyles();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onHandleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap>
                    <NavLink className={classes.homeButton} to='/crm'>Club-Browser</NavLink>
                    {configData.storeName}
                </Typography>
                <Typography>
                    <img className={classes.logo} src={clubLogo} alt="logo"/>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export default Header;