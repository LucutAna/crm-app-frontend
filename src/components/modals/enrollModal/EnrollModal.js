import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import EnrollModalStyles from './EnrollModalStyles';
import CustomerService from "../../../shared/services/CustomerService";

const EnrollModal = ({openEnrollModal, configData, onHandleCloseEnrollModal}) => {
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
    const classes = EnrollModalStyles();
    const [eKit, setEKit] = useState('');
    const [eKitValid, setEKitValid] = useState(false);
    const [consentFlag, setConsentFlag] = useState(true);

    const handleChange = (event) => {
        setConsentFlag(event.target.checked);
        console.log(consentFlag);
    };

    const handleKit = async (eKitValue) => {
        setEKit(eKitValue);
        if (CustomerService.isClubCardNumberFormatValid(eKitValue, configData.salesDivision, configData.subsidiary)) {
            try {
                let data = {
                    ciid: eKitValue,
                    salesDivision: configData.salesDivision,
                    subsidiary: configData.subsidiary
                }
                const validCard = await CustomerService.validateCardNumber(data);
                setEKitValid(validCard.data.code === "SUCCESS");
            } catch (error) {
                console.log(error)
            }
        } else {
            setEKitValid(false);
        }
    }

    return (
        <>
            <Dialog onClose={onHandleCloseEnrollModal}
                    fullWidth
                    maxWidth='md'
                    aria-labelledby="customized-dialog-title"
                    open={openEnrollModal}>
                <DialogTitle id="customized-dialog-title" onClose={onHandleCloseEnrollModal}>
                    E-kit number creation
                </DialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    <FormGroup className={classes.wrapperCheckbox}>
                        <FormControlLabel className={classes.checkbox}
                            control={<Checkbox
                                checked={consentFlag}
                                onChange={handleChange}
                                color="primary"
                                name="consent" />}
                                label="Customer wants more information"
                        />
                    </FormGroup>
                    <Typography className={classes.infoText}>
                        Use an e-kit to register a new customer card.
                    </Typography>
                    <TextField fullWidth
                               label="Enter the e-kit number"
                               variant="outlined"
                               value={eKit}
                               onChange={event => handleKit(event.target.value)}/>
                    <Button className={classes.buttonRegistration}
                            size="large"
                            variant="contained"
                            fullWidth
                            disabled={!eKitValid}
                            onClick={event => onHandleCloseEnrollModal(event, "E-KIT_CARD", eKit, consentFlag)}
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
                            disabled={eKitValid}
                            onClick={(event) => onHandleCloseEnrollModal(event, "GENERATE_CIID", eKit, consentFlag)}
                            color="secondary">Generate Club card number
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default EnrollModal;
