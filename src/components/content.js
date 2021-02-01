import React from "react"
import {useState} from "react"
import axios from "axios"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"

const clientId = process.env.REACT_APP_FOURSQUARE_CLIENT_ID;
const clientSecret = process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET

const Content = (props) => {
    const [venues, setVenues] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const handleGetVenuesClick = () => {
        setIsLoading(true)
        getUserLocation()
    }

    const getUserLocation = () => {
        const success  = (position) => {
           getVenues(position)
        }
        const error = (error) => {
            console.log(error)
        }
        navigator.geolocation.getCurrentPosition(success, error)
    }

    const getVenues = (latLong) => {
        
        let lat = latLong.coords.latitude
        let long = latLong.coords.longitude
        const clientId = process.env.REACT_APP_FOURSQUARE_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
        let queryUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&ll=" + lat + "," + long + "&query=coffee&limit=10&v=20181127"

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

    const renderTableBody = venues.map((venue, i) => {
        console.log(venue.name)
        return (
            <tr key={i}>
                <td>{venue.name}</td>
                <td>{(venue.location.distance * 0.000621371192).toFixed(1)}</td>
                <td>{venue.location.formattedAddress[0]}<br/>{venue.location.formattedAddress[1]}}</td>
            </tr>
        )
    })
    

    return (
        <Container>
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
                <Col xs={12}>
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Distance</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableBody}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Content