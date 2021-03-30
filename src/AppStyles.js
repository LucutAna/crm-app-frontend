import {makeStyles} from "@material-ui/core/styles";

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
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: ThemeCRMApp.spacing(0, 1),
        // necessary for content to be below app bar
        ...ThemeCRMApp.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: ThemeCRMApp.spacing(10),
    },
}));

export default AppStyles;