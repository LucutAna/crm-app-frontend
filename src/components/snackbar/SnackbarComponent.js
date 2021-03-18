import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackbarComponent = ({openSnackbar, onSetOpenSnackbar}) => {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const TransitionUp = (props) => {
        return <Slide {...props} direction="up" />;
    }

    useEffect(() => {
        if (openSnackbar.open) {
            setTransition(() => TransitionUp);
            setOpen(true);
        }
    },[openSnackbar])

    const handleClose = () => {
        setOpen(false);
        onSetOpenSnackbar(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                autoHideDuration={4000}
                message={openSnackbar.message}
                key={transition ? transition.name : ''}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}

export default SnackbarComponent;