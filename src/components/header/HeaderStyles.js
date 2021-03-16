import {makeStyles} from "@material-ui/core/styles";

//TODO find a solution to send drawerWidth dinamic
let drawerWidth = 240;
const HeaderStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    homeButton: {
        listStyle: 'none',
        textDecoration: 'none',
        color: 'white',
        paddingRight: theme.spacing(1)
    },
    logo: {
        height: '50px',
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(3)
    }
}));

export default HeaderStyles;