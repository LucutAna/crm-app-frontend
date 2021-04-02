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
    console.log(pdfUrl);
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consequuntur corporis
                        dignissimos eaque, labore necessitatibus nobis, officiis perspiciatis quaerat qui sed soluta
                        voluptatum. Atque, ducimus, minima neque nostrum nulla officia provident quam quidem rem soluta
                        suscipit tenetur unde vero. Delectus deleniti dolor doloribus eligendi eos et, repellat.
                        Accusamus adipisci consequuntur cumque deserunt ducimus earum enim ex explicabo fugiat id
                        maiores maxime minima, minus nam neque nihil officia perferendis placeat quaerat quidem quis
                        rem, saepe sed sunt tempore temporibus ut velit? A accusamus accusantium aliquid asperiores at
                        consequatur cum debitis deserunt dolore eaque eligendi est excepturi, facere fuga illo incidunt
                        magni maiores molestiae natus necessitatibus nostrum obcaecati pariatur quam, quibusdam quis
                        quisquam quos recusandae repudiandae saepe similique soluta suscipit tempore tenetur totam ullam
                        velit voluptas! Debitis exercitationem fuga fugiat illo libero modi nisi pariatur porro
                        praesentium voluptates. Aliquam deleniti dolores ea earum excepturi facere, impedit molestias
                        nam necessitatibus omnis, placeat quidem repellendus vero? A ducimus in porro repellendus.
                        Architecto aut corporis dolor doloremque dolorum eligendi esse eveniet impedit modi molestias
                        mollitia nisi nulla perspiciatis sapiente sequi, ullam, vel. Et excepturi expedita, facere harum
                        illo impedit ipsa iste iusto mollitia possimus qui recusandae reprehenderit saepe similique
                        tempora tenetur vitae? Accusantium deleniti dolorum ex fugiat praesentium quibusdam quidem rerum
                        sequi tempora voluptatum! Consequatur debitis deleniti, doloremque dolores est facere fugiat
                        harum ipsum laudantium necessitatibus nesciunt numquam provident quaerat recusandae
                        reprehenderit repudiandae, velit. Accusamus cupiditate dolorem enim fuga illo minus, molestiae
                        non odit quae quos reprehenderit sunt unde velit vitae voluptatibus. Ad aperiam impedit libero
                        obcaecati, optio praesentium quae qui totam unde? A amet eveniet facilis, id incidunt magnam
                        minus molestias necessitatibus nostrum possimus reprehenderit sed sint, sunt voluptate
                        voluptatibus. Alias eius facere itaque rem repudiandae? Accusamus animi dolorum natus neque
                        omnis quasi quis similique tempora temporibus voluptas? Eligendi expedita nisi qui ratione
                        sequi.
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.buttonWrapper}>
                    <Button autoFocus variant="contained" onClick={(event) => {
                        onHandleClosePrintModal(event, "SUBMIT")
                    }} color="primary">
                        Yes, send data
                    </Button>
                    <Button autoFocus variant="contained" onClick={onHandleClosePrintModal} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PrintModal;
