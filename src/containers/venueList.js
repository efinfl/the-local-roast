import React from "react";
import {useState} from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import MapBox from "../components/mapbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const VenueList = (props) => {
    const [venues, setVenues] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(10)

    // Time before geolocation times out and throws an error
    const geoOptions = {
        timeout: 10000
    }

    // handles button click to get venues
    const handleGetVenuesClick = () => {
        setIsLoading(true)
        getUserLocation()
    }
   
    // gets user's coordinates then gets venues or handles error
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getVenues, geolocationError, geoOptions)
        } else alert("Geolocation is not supported in this browser")
    }
    // Gets venues from FourSquare API
    const getVenues = (position) => {
        const clientId = process.env.REACT_APP_FOURSQUARE_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
        let queryUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&ll=" + position.coords.latitude + "," + position.coords.longitude + "&query=coffee&limit="+results+"&v=20181127"

        axios.get(queryUrl)
            .then((res)=>{
                setIsLoading(false)
                let venues = res.data.response.venues
                setVenues(venues)
                console.log("venues-------", venues)
            }).catch((error)=>{
                setIsLoading(false)
                console.log(error.message)
            })
    }
    // Handles Geolocation errors
    const geolocationError = (error) => {
        setIsLoading(false)
        console.log(typeof error.code)
        switch(error.code) {
            case 1:
              alert("User denied the request for Geolocation.")
              break;
            case 2:
              alert("Location information is unavailable.")
              break;
            case 3:
              alert("The request to get user location timed out.")
              break;
            default:
                alert("An unknown error occurred")
          }
    }
    
    // renders the venue cards
    const renderCard = venues.map((venue, i) => {
        console.log(venue)
        return (
            <Col key={i} xs="12" sm="6" xl="4" className="mb-3">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {venue.name}
                        </Card.Title>
                        <h6><span className="weight-600 text-dark-grey" >Distance</span> 
                            <span>{` ${(venue.location.distance * 0.000621371192).toFixed(1)} Miles`}</span>
                        </h6>
                        <Card.Text style={{lineHeight: "120%"}} className="text-medium-grey">
                            {venue.location.formattedAddress[0]}<br/>{venue.location.formattedAddress[1]}
                        </Card.Text>
                    </Card.Body>
                    <div className="card-img-bottom">
                        <MapBox location={venue.location}/>
                    </div>
                </Card>
            </Col>
        )
    })
    const renderAccordion = venues.map((venue, i) => {
        console.log(venue)
        return (
            
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                        {venue.name}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={i}>
                        <>
                    <Card.Body>
                        <Card.Title>
                            {venue.name}
                        </Card.Title>
                        <h6><span className="weight-600 text-dark-grey" >Distance</span> 
                            <span>{` ${(venue.location.distance * 0.000621371192).toFixed(1)} Miles`}</span>
                        </h6>
                        <Card.Text style={{lineHeight: "120%"}} className="text-medium-grey">
                            {venue.location.formattedAddress[0]}<br/>{venue.location.formattedAddress[1]}
                        </Card.Text>
                    </Card.Body>
                    <div className="card-img-bottom">
                        <MapBox location={venue.location}/>
                    </div>
                    </>
                </Accordion.Collapse>
            </Card>
        )
    })

    // Render number of results selection
    const numberOfResults = () => {
        return (
            <Dropdown className="mr-3">
                <Dropdown.Toggle variant="outline-secondary" id="results-number">
                    {`${results} Results`}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>setResults(5)}>5 Results</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setResults(10)}>10 Results</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setResults(20)}>20 Results</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    
    // JSX
    return (
        <>
            <Row className="my-2">
                <Col className = "d-flex justify-content-end">
                    {numberOfResults()}
                    <Button 
                        variant="danger" 
                        size="sm"
                        onClick={!isLoading? handleGetVenuesClick: null}> 
                        {isLoading? "Loading...": "Find Local Roasts"}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm="12" >
                    <Accordion>
                        {renderAccordion}
                    </Accordion>
                </Col>
            </Row>
            
        </>
    )
}

export default VenueList