import React from "react"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Jumbotron from 'react-bootstrap/Jumbotron'

const hero = () => {
    return (
        <Row>
            <Col className="header bg-dark-grey d-flex justify-content-end ">
                Find Local, Independent Coffee Shops Near You
            </Col>
                <Jumbotron sticky="top" className="p-0 d-flex align-items-center mb-1 col-12">
                    <Container>
                        <Row>
                        <Col xs={6} xs={{offset: 1}} lg={{offset: 2}}>
                            <h1>
                            THE <br></br> <span className="text-bright-red">LOCAL</span> <br></br>ROAST 
                            </h1>
                        </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            <Col className="dashed-lines"></Col>
      </Row>
    )
}

export default hero