import Button from "@material-ui/core/Button";
import {Card, CardContent} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import i18next from "i18next";
import ShoppingCardStyle from "./ShoppingCardStyle";

const InstantCard = () =>{
    const history = useHistory();
    const classes = ShoppingCardStyle();

    return(
        <div>
            <Card>
                <CardContent>
                    <h3>
                        {i18next.t('LBL_INSTANT_CARD_POSSIBLE')}
                    </h3>
                    <div>
                        <p>1.  {i18next.t('LBL_PRINT_INSTANT_CARD')}</p>
                        <Button   variant="contained"
                                  color="primary">{i18next.t('BTN_PRINT_INSTANT_CARD')}
                        </Button>
                    </div>
                    <div>
                        <p>2. {i18next.t('LBL_PRINT_COPIES_OF_APP')}</p>
                        <Button   variant="contained"
                                  color="primary">{i18next.t('BTN_PRINT_APPLICATION_FORM')}
                        </Button>
                    </div>
                    <div className={classes.closeButton}>
                    <Button   variant="contained"
                              color="secondary"
                              onClick= { () =>
                              {
                                  history.push(
                                      {
                                          pathname: `/`
                                      });
                              }}>{i18next.t('BTN_CLOSE')}
                    </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default InstantCard;
