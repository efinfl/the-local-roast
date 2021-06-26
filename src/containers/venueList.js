import React from "react";
import {useState} from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import MapBox from "../components/mapbox";

// Details for a venue endpoint
// GET https://api.foursquare.com/v2/venues/VENUE_ID

const VenueList = (props) => {
    const [venues, setVenues] = useState([])
    const [venueDetail, setVenueDetail] = useState({hours: [{days: "", open: [] }], isOpen: ""})
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(10)
    const [userLocation, setUserLocation] = useState({});
    const [showModal, setShowModal] = useState(false);

    const clientId = process.env.REACT_APP_FOURSQUARE_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET

    // Time before geolocation times out and throws an error
    const geoOptions = {
        timeout: 10000
    }
    const handleModal = () =>{ 
        const modal = showModal
        setShowModal(!modal)
    };

    const detail = (i) => {
        let selected= venues[i];
        getVenuesDetails(selected.id)
    }

    const detailModal = () => {
        return (
            <Modal show={showModal} onHide={handleModal}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleModal}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
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
        setUserLocation({lat: position.coords.latitude, lng: position.coords.longitude})
        let queryUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + 
                        clientId + 
                        "&client_secret=" + 
                        clientSecret + 
                        "&ll=" + 
                        position.coords.latitude + 
                        "," + 
                        position.coords.longitude + 
                        "&query=coffee&limit="+
                        results+"&v=20181127"

        axios.get(queryUrl)
            .then((res)=>{
                setIsLoading(false)
                let venues = res.data.response.venues
                setVenues(venues)
            }).catch((error)=>{
                setIsLoading(false)
                console.log(error.message)
            })
    }
    // Gets details of a specific venue Square API
    const getVenuesDetails = (venueId) => {
        let selected = venueId
        let queryUrl = "https://api.foursquare.com/v2/venues/" + selected + "?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20181127"
        console.log(queryUrl)
        axios.get(queryUrl)
            .then((res)=>{
                // console.log("venue details: ", res.data.response.venue)
                let details = res.data.response.venue
                extractDetails(details)
            }).catch((error)=>{
                console.log("venue details error: ", error.message)
            })
    }

    const extractDetails = (details) => {
        console.log("details.hours: ", details.hours)
        let newDetails = {}
        let hours = [];
        let status = "";
        //extracts hours of operation
        if (details.hours) {
            details.hours.timeframes.forEach((item) => {
                console.log("item: ", item)
                let obj = {};
                let openHours = []
                item.open.forEach((openTime)=>{
                    openHours.push(openTime.renderedTime)
                })
                
                obj.days = item.days
                obj.open = [openHours]
                hours.push(obj)
            });
            newDetails.status = details.hours.status
        } else console.log("No Hours Prop")
        newDetails.hours = hours
        console.log("newDetails: ", newDetails)
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
    const renderCards = venues.map((venue, i) => {
        return (
            <Col key={i} xs="12" sm="6" xl="4" className="mb-3">
                <Card noGutters = {true}>
                    <Card.Body>
                        <Card.Title className="venue-details">
                            <span className = "weight-400" onClick={()=>detail(i)}>{venue.name}</span>
                        </Card.Title>
                        <Card.Text style={{lineHeight: "120%"}} className="text-medium-grey">
                            <span>{` ${(venue.location.distance * 0.000621371192).toFixed(1)} Miles`}</span><br></br>  
                            <span>{venue.location.formattedAddress[0]}</span><br></br>
                            <span>{venue.location.formattedAddress[1]}</span>
                        </Card.Text>
                    </Card.Body>
                    <div className="card-img-bottom">
                        <MapBox location={venue.location} userLat={userLocation.lat} userLng={userLocation.lng}/>
                    </div>
                </Card>
            </Col>
        )
    })
    const renderListItem = venues.map((venue, i) => {
        return(
            <>
                <Col key={i} xs="12">
                    <h6>
                        {venue.name}
                    </h6>
                    <div className="text-medium-grey">
                        <span>{`${(venue.location.distance * 0.000621371192).toFixed(1)} Miles`}</span><br></br>  
                        <span>{venue.location.formattedAddress[0]}</span><br></br>
                        <span>{venue.location.formattedAddress[1]}</span>
                    </div>
                    <hr></hr>
                </Col>
            </>
        )
    })

    

    // Dropdown for selecting number of results
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
    console.log(venues)
    // JSX
    return (
        <>
            <Row className="my-3">
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
                {/* {renderCards} */}
                {renderListItem}
            </Row>
            {detailModal()}
        </>
    )
}

export default VenueList