import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const RegistrationButtons = ({onSelectCustomer, onClearForm, onNewRegistration}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(4),
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(4),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        buttons: {
            marginTop: 20
        }
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <Button size="large"
                                variant="contained"
                                color="secondary"
                                onClick={onNewRegistration}>New Club Registration
                        </Button>
                        <Button size="large"
                                className={classes.buttons}
                                variant="contained"
                                color="primary"
                                onClick={onSelectCustomer}>Search
                        </Button>
                        <Button size="large"
                                className={classes.buttons}
                                onClick={onClearForm}>
                            <DeleteForeverIcon fontSize="small"/> Clear
                        </Button>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );


}

export default RegistrationButtons;