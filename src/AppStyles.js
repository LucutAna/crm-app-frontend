import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;
const AppStyles = makeStyles((ThemeCRMApp) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: ThemeCRMApp.spacing(0, 1),
        // necessary for content to be below app bar
        ...ThemeCRMApp.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: ThemeCRMApp.spacing(10),
        transition: ThemeCRMApp.transitions.create('margin', {
            easing: ThemeCRMApp.transitions.easing.sharp,
            duration: ThemeCRMApp.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: ThemeCRMApp.transitions.create('margin', {
            easing: ThemeCRMApp.transitions.easing.easeOut,
            duration: ThemeCRMApp.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default AppStyles;