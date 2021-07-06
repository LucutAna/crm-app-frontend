import {makeStyles} from '@material-ui/core/styles';

const SearchInputStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingBottom: 50
    },
    searchIcon: {
        cursor: 'pointer',
        padding: '0.5em'
    },
    textField: {
        width: '65%'
    }
}));

export default SearchInputStyles;