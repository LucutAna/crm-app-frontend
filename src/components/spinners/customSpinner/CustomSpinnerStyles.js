import {makeStyles} from '@material-ui/core/styles';

const CustomSpinnerStyles = makeStyles((theme) => ({
    wrapperSpinner: {
        display: 'flex',
        height: '300px',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default CustomSpinnerStyles;