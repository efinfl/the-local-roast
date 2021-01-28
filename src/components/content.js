import React from "react"
import {useEffect, useState} from "react"
import axios from "axios"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"

const Content = (props) => {
    const [coordinates, setCoordinates] = useState({lat: undefined, long: undefined})
    const [venues, setVenues] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if (coordinates.lat !== undefined && coordinates.long !== undefined) {
            console.log(coordinates.lat, coordinates.long)
            getVenues()
        }
    },[coordinates])

   
    const handleGetVenuesClick = () => {
        setIsLoading(true)
        getCoordinates()
    }

    const getCoordinates = () => {
        navigator.geolocation.getCurrentPosition (
            (position) => {
                setCoordinates(
                    {
                        lat: parseFloat(position.coords.latitude), 
                        long: parseFloat(position.coords.longitude)
                    }
                )
            }
        )
    }

    const getVenues = () => {
        console.log(coordinates.lat)
        console.log(coordinates.lat)
        let clientId = "WQL4F35RFS2BMBNVUKYJSDZDIEWP4IPOHIW0CKHLWO2YZPUZ"
        let clientSecret = "11OK3MBODQM3HWUWYRYWRHRUVFMFYU5JGWIONSTSXBY5DMS1"
        let queryUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&ll=" + coordinates.lat + "," + coordinates.long + "&query=coffee&limit=10&v=20181127"

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
                <td>{venue.location.formattedAddress[0]}</td>
                <td>{venue.location.formattedAddress[1]}</td>
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
                    <Table striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Distance</th>
                                <th>Address</th>
                                <th>City, State</th>
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