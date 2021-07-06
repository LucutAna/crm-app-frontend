import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplacementCardStyles from "./ReplacementCardStyles";

const ReplacementCard = () => {
    const classes = ReplacementCardStyles();
    return (
        <Paper elevation={3}>
            <h3 className={classes.paperHeader}>Replacement card</h3>
            <div className={classes.paperContent}>
                <div className={classes.couponsContainer}>
                    <Grid container
                        spacing={1}
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} sm={2}>
                        </Grid>
                        <Grid className={classes.wrapperCouponInfo} item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Paper>
    )
}

export default ReplacementCard;