import CircularProgress from '@material-ui/core/CircularProgress';

import CustomSpinnerStyles from './CustomSpinnerStyles';

const CustomSpinner = ({openSpinner}) => {
    const classes = CustomSpinnerStyles();
    return (
        <>
            {
                (openSpinner) ?
                    <div className={classes.wrapperSpinner}>
                        <CircularProgress size='120px' color="primary" thickness={6}/>
                    </div> : null
            }
        </>
    )
}

export default CustomSpinner;