import {makeStyles} from '@material-ui/core/styles';

const SearchInputStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingBottom: 50
    },
    textField: {
        width: '65%'
    },
}));

export default SearchInputStyles;