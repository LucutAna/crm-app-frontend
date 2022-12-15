import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import RegisterSalesSlipStyles from './RegisterSalesSlipStyles';
import PostRegistrationSalesSlipInputs from '../postRegistrationSalesSlipInputs/PostRegistrationSalesSlipInputs'
import ImageRegistrationSalesSlip from '../../assets/images/registration_saleslip.png';
import i18next from "i18next";

const RegisterSalesSlip = ({configData}) => {
    const classes = RegisterSalesSlipStyles();
    return (
        <Paper elevation={3}>
            <h3 className={classes.paperHeader}>{i18next.t('TAB_REGISTER_SALES_SLIP')}</h3>
            <div className={classes.paperContent}>
                    <Grid container
                        spacing={2}
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} sm={6}>
                           <PostRegistrationSalesSlipInputs configData={configData}/>
                        </Grid>
                        <Grid className={classes.gridContent} item xs={12} sm={6}>
                            <img className={classes.salesSlipImage} src={ImageRegistrationSalesSlip} alt="registration-sales-slip"/>
                        </Grid>
                    </Grid>
                </div>
        </Paper>
    )
}

export default RegisterSalesSlip;
