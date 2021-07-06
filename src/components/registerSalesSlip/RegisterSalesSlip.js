import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import RegisterSalesSlipStyles from './RegisterSalesSlipStyles';

const RegisterSalesSlip = () => {
    const classes = RegisterSalesSlipStyles();
    return (
        <Paper elevation={3}>
            <h3 className={classes.paperHeader}>Register sales slip</h3>
            <div className={classes.paperContent}>
                    <Grid container
                        spacing={2}
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <p>Lorem ipsum dolor.</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </Grid>
                    </Grid>
                </div>
        </Paper>
    )
}

export default RegisterSalesSlip;