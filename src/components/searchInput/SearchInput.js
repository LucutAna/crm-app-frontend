import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const SearchInput = ({onHandleCiid, ciid}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            paddingBottom: 50
        },
        textField: {
            marginLeft: theme.spacing(10),
            marginRight: theme.spacing(10),
        },
    }));
    const classes = useStyles();
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