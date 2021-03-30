import {makeStyles} from "@material-ui/core/styles";

//TODO find a solution to send drawerWidth dinamic
let drawerWidth = 240;
const HeaderStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        marginLeft: -22,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
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