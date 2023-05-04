// import Button from "@material-ui/core/Button";
// import {Card, CardContent} from "@material-ui/core";
// import {useHistory} from "react-router-dom";
// import i18next from "i18next";
//
// const NoInstantCard = () =>{
//     const history = useHistory();
//
//     return(
//         <div>
//             <Card>
//                 <CardContent>
//                     <h3>
//                         {i18next.t('LBL_INSTANT_CARD_NOT_POSSIBLE')}
//                     </h3>
//                     <div>
//                         <h4>{i18next.t('LBL_REMARKS')}</h4>
//                         <p>{i18next.t('LBL_ADDITIONAL_INFORMATION_NEEDED')}</p>
//                         <p>1. {i18next.t('LBL_PRINT_COPIES_OF_APP')}</p>
//                         <Button   variant="contained"
//                                   color="primary">{i18next.t('BTN_PRINT_APPLICATION_FORM')}
//                         </Button>
//                     </div>
//                     <div>
//                         <p>2.  {i18next.t('LBL_HANDOVER_PRINTED_APP_FORM')} </p>
//                     </div>
//                     <div>
//                     <Button   variant="contained"
//                               color="secondary"
//                               onClick= { () =>
//                               {
//                                   history.push(
//                                       {
//                                           pathname: `/`
//                                       });
//                               }}>{i18next.t('BTN_CLOSE')}
//                     </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }
//
// export default NoInstantCard;
