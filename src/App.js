import React from "react"
import Container from "react-bootstrap/Container"
import Content from "./components/content"
import Footer from "./components/footer"
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
