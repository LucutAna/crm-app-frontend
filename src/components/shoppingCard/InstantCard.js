import Button from "@material-ui/core/Button";


const InstantCard = () =>{

    return(
        <div>
            <h3>
                Instant card possible.
            </h3>
            <div>
                <label>1. Please print the instant card.</label>
                <Button   variant="contained"
                          color="primary">Print instant card
                </Button>
            </div>
            <div>
                <label>2. Please print the application form two times. One for the customer and one for Availabill.</label>
                <Button   variant="contained"
                          color="primary">Print application form
                </Button>
            </div>
            <Button   variant="contained"
                      color="secondary">Close
            </Button>
        </div>
    )
}

export default InstantCard;