import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplacementCardStyles from "./ReplacementCardStyles";
import TextField from "@material-ui/core/TextField";
import {useContext, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import CustomerService from "../../shared/services/CustomerService";
import MemberService from "../../shared/services/MemberService";
import {GlobalContext} from "../../context/GlobalState";
import moment from "moment";

const ReplacementCard = (props) => {
    const {customerData, addTransactions, addCoupons, deleteCoupons, ...rest} = useContext(GlobalContext);
    const [replacementCard, setReplacementCard] = useState('');
    const [existingCards, setExistingCards] = useState([]);
    const [customer, setCustomer] = useState( []);

    useEffect(() => {
       getAllCards();
    },[]);

    const getActivationDate = (card) =>{
        if(customer && customer.customerCards){
        const cardFound = customer.customerCards.find(item => item.ciid === card.ciid)
        return cardFound && moment(cardFound.activationDate).format("DD-MM-yyyy");
        }
    }

    const classes = ReplacementCardStyles();

   const replacementCardHandler=(event) => {
        setReplacementCard(event.target.value)
    }
    const addReplacementCard =() => {
       const {salesDivision, subsidiary} = props;
     const dataToBeSaved = {
         ...customer,
         ciid:replacementCard,
         salesDivision,
         subsidiary
     }
        CustomerService.validateCardNumber(dataToBeSaved)
            .then(() => {
                const data= CustomerService.createCustomerUpsertData(customer, props.configData)
                data.cardCiid = dataToBeSaved.ciid;
                CustomerService.upsertCustomer(data)
                    .then((result) => {
                   console.log(result);
                   getAllCards();
                    })
            })
    }

    const getAllCards = () => {
        const {salesDivision, subsidiary, partyUid,activationDate} = props;
        const data = {
            salesDivision,
            subsidiary,
            partyUid,
            activationDate
        }
        MemberService.getHousehold(data)
            .then( (result) => {
                console.log('result',result)
                setExistingCards(result.data[0].householdCards)
            })
        CustomerService.selectCustomer(data)
            .then((result) =>{
                console.log("result 2",result)
                setCustomer(result.data);
            })
    }
   const checkCardType = (card) => {
      const activationDate =  getActivationDate(card);
      console.log(activationDate)
       if (card.cardTypeCode === 'P' && moment(activationDate).isAfter(moment("2020-11-02T03:08:00"))){
           return 'SYSTEM'
       }
       return 'P'
    }
    const checkStatusCode = (card) => {
        if (card.statusCode === 'I') {
            return 'Active'
        }
        return 'Inactive'
    }
    console.log('cards', existingCards);

    return (
        <Paper elevation={3}>
            <h3 className={classes.paperHeader}>Replacement card</h3>
            <div className={classes.paperContent}>
                <div className={classes.couponsContainer}>
                    <div>
                        <TextField
                            size="small"
                            type="number"
                            variant="outlined"
                           className={classes.inputText}
                        value={replacementCard}
                        onChange={replacementCardHandler}/>
                    </div>
                    <Button className={classes.addReplacementCardButton}
                            size="large"
                            variant="contained"
                            color="primary"
                        onClick={addReplacementCard}
                            >Add replacement card</Button>
                    <Grid container
                        spacing={1}
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} sm={2}>
                        </Grid>
                        <Grid className={classes.wrapperCouponInfo} item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        </Grid>
                    </Grid>
                    <h4>Card numbers of this customer account</h4>
                    <Divider />
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <a>Card number</a>
                            <a>Card type</a>
                            <a>Issued on</a>
                            <a>Status</a>
                        </Paper>
                    </Grid>
                    <List component="nav">
                        {existingCards.map((card) =>(
                                <ListItem>
                                    <ListItemText  primary= {card.ciid} />
                                    <ListItemText align="left" primary= {checkCardType(card)} />
                                    <ListItemText align="right" primary= {getActivationDate(card)}/>
                                    <ListItemText  align="right" primary= {checkStatusCode(card)} />
                                </ListItem>
                                ))}
                    </List>
                    <Divider />
                </div>
            </div>
        </Paper>
    )
}

export default ReplacementCard;
