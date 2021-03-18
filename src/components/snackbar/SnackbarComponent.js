import {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackbarComponent = ({openSnackbar}) => {
    const [open, setOpen] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    useEffect(() => {
        if (openSnackbar.open) {
            setOpen(true);
        }
    }, [openSnackbar])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    /*
            There are four types of alert messages:
             - error
             - warning
             - info
             - success
             https://material-ui.com/components/snackbars/
    */
    return (
        <div>
            <Snackbar open={open}
                      anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                      autoHideDuration={4000}
                      onClose={handleClose}>
                <Alert onClose={handleClose}
                       severity={openSnackbar.code}>
                    {openSnackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnackbarComponent;