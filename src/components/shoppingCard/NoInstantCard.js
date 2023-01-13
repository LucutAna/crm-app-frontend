import Button from "@material-ui/core/Button";


const NoInstantCard = () =>{

    return(
        <div>
            <h3>
                Instant card possible.
            </h3>
            <div>
                <label>1. Please print the application form two times. One for the customer and one for Availabill.</label>
                <Button   variant="contained"
                          color="primary">Print application form
                </Button>
            </div>
            <div>
                <label>2.  Please handover printed application form and inform the customer that he has to finish the process at home, by fullfilling all the relevant information.
                    Give the customer also the envelope that he can send the application directly to Availabill. </label>
            </div>
            <Button   variant="contained"
                      color="secondary">Close
            </Button>
        </div>
    )
}

export default NoInstantCard;