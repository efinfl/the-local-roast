import React from "react"
import {useState} from "react"
import axios from "axios"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import MapBox from "../components/mapbox"

const VenueList = (props) => {
    const [venues, setVenues] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const geoOptions = {
        timeout: 5000
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
        let queryUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&ll=" + position.coords.latitude + "," + position.coords.longitude + "&query=coffee&limit=10&v=20181127"

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
        console.log(venue.name)
        return (
            <Col key={i} xs="12" sm="6" md="4" lg="4" xl="3" className="mb-3">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {venue.name}
                        </Card.Title>
                        <h6><span className="weight-600 text-dark-grey" >Distance</span> 
                            <span>{` ${(venue.location.distance * 0.000621371192).toFixed(1)} Miles`}</span>
                        </h6>
                        <Card.Text style={{lineHeight: "120%"}}>
                            {venue.location.formattedAddress[0]}<br/>{venue.location.formattedAddress[1]}
                        </Card.Text>
                    </Card.Body>
                    <div className="card-img-bottom p-5 bg-light-grey">
                        <MapBox/>
                    </div>
                </Card>
            </Col>
            
        )
    })
    
    // JSX
    return (
        <>
            <Row className="my-2">
                <Col className = "d-flex justify-content-end">
                    <Button 
                        variant="danger" 
                        size="sm"
                        onClick={!isLoading? handleGetVenuesClick: null}> 
                        {isLoading? "Loading...": "Find Local Roasts"}
                    </Button>
                </Col>
            </Row>
            <Row>
                {renderCard}
            </Row>
        </>
    )
}

export default VenueList