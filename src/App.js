import React from "react"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Content from "./components/content"
import Footer from "./components/footer"
import Button from "react-bootstrap/Button"
import Hero from "./components/hero"


function App() {
  return (
    <Container fluid>
      <Hero/>
      <Content/>
      <Footer/>
    </Container>
  );
}

export default App;
