import React from "react"
import Container from "react-bootstrap/Container"
import VenueList from "../containers/venueList"

const Content = (props) => {
    
    return (
        <Container className="content">
           <VenueList/>
        </Container>
    )
}

export default Content