import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogActions from "@material-ui/core/DialogActions";
import {withStyles} from '@material-ui/core/styles';

import PrintModalStyle from './PrintModalStyle'


const PrintModal = ({openPrintModal, onHandleClosePrintModal, pdfUrl}) => {

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
    const classes = PrintModalStyle();
    return (
        <div>
            <Dialog onClose={onHandleClosePrintModal}
                    fullWidth
                    maxWidth='md'
                    aria-labelledby="customized-dialog-title"
                    open={openPrintModal}>
                <DialogTitle id="customized-dialog-title" onClose={onHandleClosePrintModal}>
                    Print and send
                </DialogTitle>
                <DialogContent dividers>
                    <Typography className={classes.infoText}>
                        <embed type="application/pdf" src={pdfUrl}
                               className={classes.pdfFile}/>
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.buttonWrapper}>
                    <Button variant="contained" onClick={(event) => {
                        onHandleClosePrintModal(event, "SUBMIT")
                    }} color="primary" autoFocus>
                        Yes, send data
                    </Button>
                    <Button variant="contained" onClick={onHandleClosePrintModal} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PrintModal;
