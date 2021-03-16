import TextField from '@material-ui/core/TextField';
import SearchInputStyles from './SearchInputStyles'

const SearchInput = ({onHandleCiid, ciid}) => {
    const classes = SearchInputStyles();
    return (
        <div className={classes.root}>
            <TextField
                id="outlined-full-width"
                label="Search by Club Card Number"
                style={{margin: 8}}
                placeholder="Card Number"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={ciid}
                variant="outlined"
                onChange={event => onHandleCiid(event.target.value)}
            />
        </div>
    );
}

export default SearchInput;