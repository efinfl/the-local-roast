import React from "react"
import Container from "react-bootstrap/Container"
import Content from "./components/content"
import Footer from "./components/footer"
import Hero from "./components/hero";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faMapMarkerAlt, faStar)

function App() {
  return (
    <Container fluid>
      <div className="app-wrapper">
        <Hero/>
        <Content/>
        <Footer/>
      </div>
    </Container>
  );
}

export default App;
