import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalState";
import CouponsPageStyles from "./CouponsPageStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

const CouponsPage = () => {
    const classes = CouponsPageStyles();
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const {coupons} = useContext(GlobalContext);
    const [customerCoupons, setCustomerCoupons] = useState([]);

    useEffect(() => {
        setCustomerCoupons(Object.values(coupons))
    }, [coupons])

    console.log(customerCoupons);

    const filterCoupons = (event, newValue) => {
        setValue(newValue);
        setExpanded(false);
        if(newValue === 0) {
        }

        if(newValue === 1) {

        }

        if(newValue === 2) {

        }
    }

    return (
        <div className={classes.root}>
            <Paper>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={filterCoupons}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Coupon Code" />
                    <Tab label="Name" />
                    <Tab label="Description" />
                </Tabs>
            </Paper>
            {
                customerCoupons.length > 0 ? customerCoupons.map((coupon, index) => <Accordion expanded={expanded === index}
                                                                                               key={coupon.couponCode}
                                                                                      onChange={handleChange(index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>General settings</Typography>
                            <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ) : null
            }

        </div>
    )
}

export default CouponsPage;
