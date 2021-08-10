import {makeStyles} from '@material-ui/core/styles';

const PostRegistrationSalesSlipInputsStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '0 20px'
    },
    inputText: {
        marginTop: theme.spacing(1),
        '& div.MuiInputBase-root': {
            '&:not(.Mui-error)': {
                marginBottom: '23px'
            },
        }
    },
    slipNo: {
        '& label.Mui-focused': {
            color: '#FF0000',
        },
        '& .MuiOutlinedInput-root': {

            '&:hover fieldset': {
                borderColor: '#FF0000',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FF0000',
            },
        }
    },
    sapOutletId: {
        '& label.Mui-focused': {
            color: '#FF7F00',
        },
        '& .MuiOutlinedInput-root': {

            '&:hover fieldset': {
                borderColor: '#FF7F00',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FF7F00',
            },
        }
    },
    cashRegisterNo: {
        '& label.Mui-focused': {
            color: '#8DC254',
        },
        '& .MuiOutlinedInput-root': {

            '&:hover fieldset': {
                borderColor: '#8DC254',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#8DC254',
            },
        }
    },
    cashierNo: {
        '& label.Mui-focused': {
            color: '#0000FF',
        },
        '& .MuiOutlinedInput-root': {

            '&:hover fieldset': {
                borderColor: '#0000FF',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#0000FF',
            },
        }
    },
    slipDate: {
        '& label.Mui-focused': {
            color: '#A94699',
        },
        '& .MuiOutlinedInput-root': {

            '&:hover fieldset': {
                borderColor: '#A94699',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#A94699',
            },
        }
    },
    slipTime: {
        '& label.Mui-focused': {
            color: '#EEE120',
        },
        '& .MuiOutlinedInput-root': {

            '&:hover fieldset': {
                borderColor: '#EEE120',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#EEE120',
            },
        }
    },
    saveButton: {
        marginTop: theme.spacing(3)
    }
}));

export default PostRegistrationSalesSlipInputsStyles;