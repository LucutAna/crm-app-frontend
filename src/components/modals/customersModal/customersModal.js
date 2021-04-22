import {isNull} from 'lodash';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CustomersModalStyles from './customersModalSyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CardCard from '../../../assets/images/Club_Card_MM.png'

const CustomersModal = ({openCustomersModal, onHandleCloseCustomersModal, customersData, onSelectCustomer}) => {

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            paddingLeft: theme.spacing(4)
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: '#fff',
        }
    });
    const DialogTitle = withStyles(styles)((props) => {
        const {children, classes, onClose, ...other} = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(4),
        },
    }))(MuiDialogContent);
    const classes = CustomersModalStyles();
    return (
        <>
            <Dialog onClose={onHandleCloseCustomersModal}
                    fullWidth
                    maxWidth='md'
                    aria-labelledby="customized-dialog-title"
                    open={openCustomersModal}>
                <DialogTitle className={classes.dialogHeaders} id="customized-dialog-title"
                             onClose={onHandleCloseCustomersModal}>
                    Customers data
                </DialogTitle>
                <DialogContent dividers>
                    {customersData.map(customer =>
                        <Paper className={classes.paper}
                               variant="outlined"
                               key={customer.partyId}
                               onClick={event => onSelectCustomer(customer, event)}>
                            <Grid container
                                  justify="space-around"
                                  alignItems="flex-end"
                                  className={classes.gridContainer}>
                                <Grid item xs={12} sm={4}>
                                    <div className={classes.wrapperName}>
                                        {customer.firstName} {customer.lastName}
                                    </div>
                                    <div className={classes.capitalize}>
                                        {customer.street1} {customer.zipcode} {customer.city}
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    {!isNull(customer.partyId) ? <img className={classes.cardImage} src={CardCard} alt="card"/> : null}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {customer.email}
                                </Grid>
                                <Grid className={classes.wrapperPhone} item xs={12} sm={3}>
                                    Phone: {customer.phone}
                                </Grid>
                            </Grid>
                        </Paper>)
                    }
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CustomersModal;
