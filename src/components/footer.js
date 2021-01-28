import React from "react"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const footer = () => {
    return (
            <Row className="footer align-items-end">
                <Col sm={12} className="dashed-lines mb-1"></Col>
                <Col sm={12} className = "bg-dark-grey pt-4">
                    <Container>
                        <Row>
                            <Col sm={"4"} className = "pt-1 pb-2  mb-0">
                                <h1> THE <span className="text-bright-red">LOCAL</span> ROAST </h1>
                                <p>Your source for finding local, independent coffee shops.</p>
                            </Col>
                            <Col sm={"4"} className = "pt-1 pb-2  mb-0">
                                <h1>Contact</h1>
                                <p><a href="mailto: eric.figueroa374@gmail.com">eric.figueroa374@gmail.com</a></p>
                            </Col>
                            <Col sm={4}>
                                <h1>Photo Credit</h1>
                                <p>Photo by Marta Dzedyshko from Pexels</p>
                            </Col>
                        </Row>
                    </Container>
                    <Row id="copy-right-row">
                        <Col sm={"12"} className = "pt-1 pb-2  mb-0 text-center bg-black">
                            <p className="mb-0"> <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Copyright Eric Figueroa 2021</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

    )
}

export default footer