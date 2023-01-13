import {makeStyles} from '@material-ui/core/styles';

const ShoppingCardStyle = makeStyles(() =>({
    inputCustomerData:{
        marginLeft:'25px'
    },
    labelStyle:{
        fontWeight:'bold'
    },
    cardDetailsFields:{
        marginRight:'20px',
        marginLeft:'3px'
    },
    checkboxCardDetails:{
        paddingTop:'20px'
    },
    buttonsCardDetails:{
        paddingTop:'30px',
    },
    checklist:{
        paddingTop:'1px',
        paddingBottom:'1px',
        marginLeft:'15px'
    },
    submitButton:{
        width:'220px',
        marginLeft:'10px',
        marginTop:'25px'
    },
    onSubmitButton:{
        marginTop:"20px",
        marginLeft:"5px"
}

}));

export default ShoppingCardStyle;
