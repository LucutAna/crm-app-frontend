import TextField from '@material-ui/core/TextField';
import SearchInputStyles from './SearchInputStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import SearchIcon from "@material-ui/icons/Search";

const SearchInput = ({onHandleCiid, ciid, onSelectCustomer}) => {
    const classes = SearchInputStyles();
    return (
        <div className={classes.root}>
            <TextField
                label="Search by Club Card Number"
                id="outlined-start-adornment"
                placeholder="Card Number"
                value={ciid}
                className={clsx(classes.margin, classes.textField)}
                inputProps={
                    {maxLength: 16}
                }
                InputProps={{
                    endAdornment: <InputAdornment position="end"
                                                  onClick={onSelectCustomer}>
                                  <SearchIcon/>
                                  </InputAdornment>,
                }}
                variant="outlined"
                onChange={event => onHandleCiid(event.target.value)}
            />
        </div>
    );
}

export default SearchInput;