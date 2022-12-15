import TextField from '@material-ui/core/TextField';
import SearchInputStyles from './SearchInputStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import SearchIcon from "@material-ui/icons/Search";
import i18next from "i18next";

const SearchInput = ({onHandleCiid, ciid, onSelectCustomer, onEnter}) => {
    const classes = SearchInputStyles();
    return (
        <div className={classes.root}>
            <TextField
                label={i18next.t('LBL_LOYALTY_CARD_NUMBER_FULL_MM')}
                id="outlined-start-adornment"
                value={ciid}
                className={clsx(classes.margin, classes.textField)}
                inputProps={
                    {maxLength: 16}
                }
                InputProps={{
                    endAdornment: <InputAdornment position="end"
                                                  className={classes.searchIcon}
                                                  onClick={onSelectCustomer}>
                                  <SearchIcon/>
                                  </InputAdornment>,
                }}
                variant="outlined"
                onChange={event => onHandleCiid(event.target.value)}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        ev.preventDefault();
                        onEnter();
                    }
                }}
            />
        </div>
    );
}

export default SearchInput;
