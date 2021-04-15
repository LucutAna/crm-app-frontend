import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import CouponsStyles from './CouponsStyles';
import CouponLogoMM from '../../assets/images/mm_coupon_default.png';

const Coupons = ({coupons, onChangeStatusCoupon}) => {
    const classes = CouponsStyles();
    return (
        <>
            <Paper elevation={3}>
                <h3 className={classes.paperHeader}>Coupons</h3>
                <div className={classes.paperContent}>
                    {
                        coupons.length > 0 ?
                            coupons.filter(item => item.endDate > moment().format('YYYY-MM-DDThh:mm:ss'))
                                .map(coupon =>
                                    <div className={classes.couponsContainer}>
                                        <Grid container spacing={1} justify="center"
                                              alignItems="center" key={coupon.couponCode}>
                                            <Grid item xs={12} sm={2}>
                                                <img className={classes.cardImage} src={CouponLogoMM} alt="coupon"/>
                                            </Grid>
                                            <Grid className={classes.wrapperCouponInfo} item xs={12} sm={6}>
                                                <b className={classes.couponInfo}>{coupon.couponTypeName}</b>
                                                <p className={classes.couponInfo}>Coupon Code : {coupon.couponCode}</p>
                                                <p className={classes.couponInfo}>Valid Until: {coupon.endDate}</p>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Button
                                                    onClick={() => onChangeStatusCoupon(coupon)}
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth
                                                    value={coupon}
                                                    size="large">
                                                    {(coupon.statusCode === 'I' && coupon.couponActivationCode === 'I') ?
                                                        'ACTIVATE' : (coupon.statusCode === 'I' && coupon.couponActivationCode === 'A') ?
                                                            'DEACTIVATE' : ''}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Divider/>
                                    </div>
                                ) : null}
                </div>
            </Paper>
        </>
    )
}

export default Coupons;