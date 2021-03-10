import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const EnrollDialog = ({onOpenDialog, onHandleCloseDialog}) => {

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
            color: theme.palette.grey[500],
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

    const useStyles = makeStyles((theme) => ({
        root: { },
        buttonRegistration: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        buttonGenerate: {
            marginBottom: theme.spacing(2)
        },
        infoText: {
            fontSize: 14,
            paddingBottom: theme.spacing (1)
        },
        divider: {
            textAlign: 'center',
            paddingBottom: theme.spacing(3),
            fontWeight: 700
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <Dialog onClose={onHandleCloseDialog}
                    fullWidth
                    maxWidth='md'
                    aria-labelledby="customized-dialog-title"
                    open={onOpenDialog}>
                <DialogTitle id="customized-dialog-title" onClose={onHandleCloseDialog}>
                    E-kit number creation
                </DialogTitle>
                <DialogContent dividers>
                    <Typography className={classes.infoText}>
                        Use an e-kit to register a new customer card.
                    </Typography>
                    <form>
                        <TextField id="outlined-basic" fullWidth label="Enter the e-kit number" variant="outlined"/>
                    </form>
                    <Button className={classes.buttonRegistration}
                            size="large"
                            variant="contained"
                            fullWidth
                            color="secondary">Continue with the registration
                    </Button>
                    <Typography className={classes.divider}>
                        OR
                    </Typography>
                    <Typography className={classes.infoText}>
                        In Case you directly want to generate a Club Card Number please continue here.
                    </Typography>
                    <Button className={classes.buttonGenerate}
                            size="large"
                            variant="contained"
                            fullWidth
                            color="secondary">Generate Club card number
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EnrollDialog;
