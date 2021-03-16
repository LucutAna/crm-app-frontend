import {makeStyles} from '@material-ui/core/styles';

const SearchInputStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingBottom: 50
    },
    textField: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
    },
}));

export default SearchInputStyles;